const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database Setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Slide Model
const Slide = sequelize.define('Slide', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  layout: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'default',
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync Database
sequelize.sync({ force: true }).then(async () => {
  // Seed initial slide
  await Slide.create({
    id: '1',
    title: 'Slide 1',
    content: '# Welcome to Slide 1\nThis is a sample slide.',
    layout: 'default',
    order: 0,
  });
  console.log('Database synced and seeded');
});

// API Routes
app.get('/api/slides', async (req, res) => {
  try {
    const slides = await Slide.findAll({ order: [['order', 'ASC']] });
    res.json({success: true, message:'Slides gets successfully' ,data:slides});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch slides' });
  }
});

app.post('/api/addSlide', async (req, res) => {
  try {
    console.log('inside addSlide')
    const { activeSlideId, title, content, layout } = req.body;
    const slides = await Slide.findAll({ order: [['order', 'ASC']] });
    const activeIndex = slides.findIndex((slide) => slide.id === activeSlideId);
    const order = activeIndex >= 0 ? slides[activeIndex].order + 1 : 0;

    // Increment order of subsequent slides
    await Slide.update(
      { order: sequelize.literal('`order` + 1') },
      { where: { order: { [Sequelize.Op.gte]: order } } }
    );

    const newSlide = await Slide.create({
      id: `${Date.now()}`,
      title: title || `Slide ${slides.length + 1}`,
      content: content || `# Slide ${slides.length + 1}\nNew slide content`,
      layout: layout || 'default',
      order,
    });

    // res.status(201).json(newSlide);
    res.status(200).json({success: true, message:'Slide add successfully' ,data:newSlide});
  } catch (error) {
    console.error('error : ',error)
    res.status(500).json({ error: 'Failed to create slide' });
  }
});

app.put('/api/slide/:id/layout', async (req, res) => {
  try {
    const { id } = req.params;
    const { layout } = req.body;
    const slide = await Slide.findByPk(id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    if (!['default', 'split', 'centered', 'two-column'].includes(layout)) {
      return res.status(400).json({ error: 'Invalid layout' });
    }
    await slide.update({ layout });
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slide layout' });
  }
});

app.put('/api/slide/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, layout } = req.body;
    const slide = await Slide.findByPk(id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    await slide.update({ title, content, layout });
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update slide' });
  }
});

app.delete('/api/slides/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await Slide.findByPk(id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    const order = slide.order;
    await slide.destroy();
    // Decrement order of subsequent slides
    await Slide.update(
      { order: sequelize.literal('`order` - 1') },
      { where: { order: { [Sequelize.Op.gt]: order } } }
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete slide' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});