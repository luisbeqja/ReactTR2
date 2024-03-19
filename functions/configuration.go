package functions

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
)

const initialConfig = `{
		"languages": [
			"en_US",
			"en_GB",
			"en_AU",
			"en_NZ",
			"en_CA",
			"de_DE",
			"es_MX",
			"es_ES",
			"fr_CA",
			"fr_FR",
			"nl_NL",
			"pt_BR" 
		],
		"file_tipe": "js"
		}`

func CreateInitialConfig() error {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("Error getting home directory:", err)
		return err
	}
	infoFolder := filepath.Join(homeDir, "Add-translations-config")
	fileName := "user_config.json"

	// Create the folder if it doesn't exist
	if _, err := os.Stat(infoFolder); os.IsNotExist(err) {
		err := os.Mkdir(infoFolder, 0755)
		if err != nil {
			return err
		}
	}
	// Create the file if it doesn't exist
	if _, err := os.Stat(infoFolder + "/" + fileName); os.IsNotExist(err) {
		_, err := os.Create(infoFolder + "/" + fileName)
		if err != nil {
			return err
		}
	} else {
		return nil
	}
	// Write the initial content to the file
	err = os.WriteFile(infoFolder+"/"+fileName, []byte(initialConfig), 0644)

	if err != nil {
		return err
	}
	return nil
}

func ReadConfig(field string) ([]interface{}, error) {
	homeDir, _ := os.UserHomeDir()
	configFle := homeDir + "/Add-translations-config/user_config.json"
	jsonFile, err := os.Open(configFle)
	if err != nil {
		return nil, err
	}
	defer jsonFile.Close()

	// Read our opened jsonFile as a byte array.
	byteValue, _ := io.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	langsArray := result[field].([]interface{})

	return langsArray, nil
}

func DownloadConfig() error {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		fmt.Println("Error getting home directory:", err)
		return err
	}
	// Specify the download folder path
	downloadFolderPath := filepath.Join(homeDir, "Downloads")

	srcFile, err := os.Open(homeDir + "/Add-translations-config" + "/user_config.json")
	if err != nil {
		return err
	}
	defer srcFile.Close()
	fileName := "user_config.json"

	// Create the destination file in the specified folder
	destFileName := filepath.Join(downloadFolderPath, fileName)
	destFile, err := os.Create(destFileName)
	if err != nil {
		return err
	}
	defer destFile.Close()

	// Copy the contents from source to destination
	_, err = io.Copy(destFile, srcFile)
	if err != nil {
		return err
	}
	OpenDowloadFolder(homeDir + "/Downloads")
	return nil
}

func OpenDowloadFolder(folderPath string) error {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "darwin":
		cmd = exec.Command("open", folderPath)
	case "windows":
		cmd = exec.Command("explorer", folderPath)
	case "linux":
		cmd = exec.Command("xdg-open", folderPath)
	default:
		return fmt.Errorf("unsupported operating system")
	}

	return cmd.Run()
}
