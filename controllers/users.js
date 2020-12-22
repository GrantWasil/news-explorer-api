module.exports.getCurrentUser = (req, res) => {
  res.send({
    data: req.user,
  });
};
