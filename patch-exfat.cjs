const fs = require("fs");

function wrapCallback(cb) {
  return function (err, result) {
    if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
      const einval = new Error("EINVAL: invalid argument, readlink");
      einval.code = "EINVAL";
      return cb(einval);
    }
    return cb(err, result);
  };
}

const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  const cb = typeof options === "function" ? options : callback;
  const opts = typeof options === "function" ? undefined : options;
  return origReadlink.call(fs, path, opts, wrapCallback(cb));
};

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
      const einval = new Error("EINVAL: invalid argument, readlink");
      einval.code = "EINVAL";
      throw einval;
    }
    throw err;
  }
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
        const einval = new Error("EINVAL: invalid argument, readlink");
        einval.code = "EINVAL";
        throw einval;
      }
      throw err;
    }
  };
}

