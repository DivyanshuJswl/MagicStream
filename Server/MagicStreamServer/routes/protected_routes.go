package routes

import (
	"github.com/divyanshujswl/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/divyanshujswl/MagicStream/Server/MagicStreamServer/middleware"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func SetupProtectedRoutes(router *gin.Engine, client *mongo.Client) {
    // Create a route group with middleware
    protected := router.Group("/")
    protected.Use(middleware.AuthMiddleware())
    {
        protected.GET("/movie/:imdb_id", controllers.GetMovie(client))
        protected.POST("/addmovie", controllers.AddMovie(client))
        protected.GET("/recommendedmovies", controllers.GetRecommendedMovies(client))
        protected.PATCH("/updatereview/:imdb_id", controllers.AdminReviewUpdate(client))
    }
}

