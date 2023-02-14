# TimeTracker App

## Models

### User

    - Admin
    - TeamLeader
    - TeamMember belongs to TeamLeader

### Team

    - has one User/TeamLader

### Project

    - belongs to Team
    - has one Client

### Task

    - belongs to Project
    - has many Tag

### Tag


### Client




## Description

## Backend

- Node
- MongoDB / Mongoose
- Passport / Passport Local

## Frontend

- React

## Deployment

- Docker / DockerHub