# Jointrix Backend

A robust backend server for managing presentation slides with dynamic layouts and real-time updates.

## 🚀 Features

- **Slide Management**
  - Create, read, update, and delete slides
  - Automatic slide ordering
  - Support for multiple slide layouts
  - Markdown content support

- **Layout Options**
  - Default layout
  - Split layout
  - Centered layout
  - Two-column layout

- **API Endpoints**
  - `GET /api/slides` - Fetch all slides
  - `POST /api/addSlide` - Create a new slide
  - `PUT /api/slide/:id` - Update slide content
  - `PUT /api/slide/:id/layout` - Update slide layout
  - `DELETE /api/slides/:id` - Delete a slide

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database
- **Sequelize ORM** - Database ORM
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development server with auto-reload

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The server will start running on `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── server.js          # Main application file
├── database.sqlite    # SQLite database file
├── package.json       # Project dependencies
└── README.md         # Project documentation
```

## 🔄 API Usage Examples

### Get All Slides
```bash
GET http://localhost:3001/api/slides
```

### Create New Slide
```bash
POST http://localhost:3001/api/addSlide
Content-Type: application/json

{
  "activeSlideId": "1",
  "title": "New Slide",
  "content": "# New Content",
  "layout": "default"
}
```

### Update Slide
```bash
PUT http://localhost:3001/api/slide/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "# Updated Content",
  "layout": "split"
}
```

### Update Slide Layout
```bash
PUT http://localhost:3001/api/slide/:id/layout
Content-Type: application/json

{
  "layout": "centered"
}
```

## 📝 Database Schema

### Slide Model
- `id` (String, Primary Key)
- `title` (String, Required)
- `content` (Text, Required)
- `layout` (String, Required, Default: 'default')
- `order` (Integer, Required)

## 🔐 Error Handling

The API includes comprehensive error handling for:
- Database connection issues
- Invalid requests
- Not found resources
- Server errors

