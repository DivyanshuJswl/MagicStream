package database

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Connect() *mongo.Client {
	err := godotenv.Load(".env")

	if err != nil {
		log.Println("Warning: Unable to find .env file")
	}

	MongoDB := os.Getenv("MONGODB_URI")
	if MongoDB == "" {
		log.Fatal("MONGODB_URI not set!")
	}

	fmt.Println("MongoDb_Uri: ", MongoDB)

	clientOptions := options.Client().ApplyURI(MongoDB)

	client, err := mongo.Connect(clientOptions)

	if err != nil {
		return nil
	}
	return client
}

func OpenCollection(collectionName string, client *mongo.Client) *mongo.Collection {
	err := godotenv.Load(".env")

	if err != nil {
		log.Println("Warning: Unable to find .env file")
	}

	databaseName := os.Getenv("DATABASE_NAME")

	// fmt.Println("Database Name: ", databaseName)

	collection := client.Database(databaseName).Collection(collectionName)

	if collection == nil {
		return nil
	}
	return collection
}
