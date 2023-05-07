package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	AllMovies() ([]*models.Movie, error)
	GetMovieByID(id int) (*models.Movie, error)
	GetMovieByIDForEdit(id int) (*models.Movie, []*models.Genre, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
	AllGenres() ([]*models.Genre, error)
	InsertMovie(movie models.Movie) (int, error)
	UpdateMovieGenres(id int, genreIds []int) error
	UpdateMovie(movie models.Movie) error
}
