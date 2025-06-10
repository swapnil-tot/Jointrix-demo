```ascii
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer (Frontend)                   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Express Server Layer                      │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐    │
│  │   Routes    │    │ Middleware  │    │  Error Handling   │    │
│  │  /api/*     │    │  CORS, JSON │    │  & Validation     │    │
│  └─────────────┘    └─────────────┘    └───────────────────┘    │
│                                                                 │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database Layer                            │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐    │
│  │  Sequelize  │    │   SQLite    │    │    Models         │    │
│  │    ORM      │◄──►│  Database   │◄──►│    (Slide)        │    │
│  └─────────────┘    └─────────────┘    └───────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Data Flow:
1. Client Request → Express Server
2. Middleware Processing
3. Route Handler
4. Model Operations
5. Database Interaction
6. Response to Client

Key Features:
• RESTful API Endpoints
• CORS Support
• JSON Parsing
• Data Validation
• Error Handling
• Database Operations
• Slide Management
• Order System
``` 