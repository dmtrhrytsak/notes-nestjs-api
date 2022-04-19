# Notes API
<div id="top"></div>

<div align="center">
  <br>
  <p align="center">
    <a href="https://notes-nestjs-api.herokuapp.com/api/notes">API LINK</a>
  </p>
</div>

## General info
Notes API created with NestJS, deployed on Heroku.

## Available endpoints
| Query Type | Endpoint               | Action                         |
|------------|------------------------|--------------------------------|
| POST       | /api/notes             | Create note                    |
| GET        | /api/notes             | Get all notes                  |
| GET        | /api/notes/:id         | Get single note                |
| PATCH      | /api/notes/:id         | Edit note                      |
| DELETE     | /api/notes/:id         | Delete note                    |
| GET        | /api/notes/:id/archive | Toggle note archived           |
| GET        | /api/notes/stats       | Get aggregated data statistics |

## Technologies
Project is created with:
* NestJS
* typescript
* mongoDB
* mongoose
* cors
* helmet
* dotenv
* class-validator
* Heroku
