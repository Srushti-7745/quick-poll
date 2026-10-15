const router = require('express').Router();
const Poll = require('../models/Poll');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const polls = await Poll.find().populate('createdBy', 'name');
  res.json(polls);
});

router.get('/active', auth, async (req, res) => {
  const polls = await Poll.find({ isActive: true }).populate('createdBy', 'name');
  res.json(polls);
});

router.get('/my', auth, async (req, res) => {
  const polls = await Poll.find({ createdBy: req.user.id });
  res.json(polls);
});

router.post('/', auth, async (req, res) => {
  try {
    const { question, options } = req.body;
    const poll = await Poll.create({
      question,
      options: options.map(o => ({ text: o })),
      createdBy: req.user.id
    });
    res.json(poll);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/vote', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll.isActive) return res.status(400).json({ message: 'Poll is closed' });
    if (poll.voters.includes(req.user.id))
      return res.status(400).json({ message: 'Already voted' });
    poll.options[req.body.optionIndex].votes += 1;
    poll.voters.push(req.user.id);
    await poll.save();
    res.json(poll);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (poll.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });
    await poll.deleteOne();
    res.json({ message: 'Poll deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;