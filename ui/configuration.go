package ui

import (
	"fmt"
	"os"

	"github.com/luisbeqja/autoRR2/functions"
)

func AddConfigurationHandler(file string) string {
	homeDir, _ := os.UserHomeDir()
	// Your input string
	inputString := file
	path := homeDir + "/Add-translations-config/user_config.json"
	// Write the string to a file
	err := os.WriteFile(path, []byte(inputString), 0644)

	if err != nil {
		fmt.Println("Error writing to file:", err)
		return ""
	}
	return "Your configuration has been added to the file."
}

func DowloadConfigHandler() string {
	err := functions.DownloadConfig()
	if err != nil {
		return "Error downloading file:" + err.Error()
	}
	return "File user_config.json in Downloads folder"
}