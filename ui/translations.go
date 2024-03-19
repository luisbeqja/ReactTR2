package ui

import (
	"fmt"
	"strings"

	"github.com/luisbeqja/autoRR2/functions"
)

func AddTranslationHandler(text string, path string, translationKey string) string {
	langsArray, err := functions.ReadConfig("languages")
	if err != nil {
		return "Error reading config file"
	}
	parts := strings.Split(text, "\t")
	for key, part := range parts {
		if len(langsArray) > key {
			langPath := path + "/" + fmt.Sprintf("%v", langsArray[key]) + ".js"
			err := functions.AddTranslation(part, langPath, translationKey)
			if err != nil {
				return "Error adding translation to " + fmt.Sprintf("%v", langsArray[key])
			}
		}

	}
	return "Your translations have been added to all the files."
}

func AddSingleTranslationHandler(text string, path string, translationKey string) string {
	err := functions.AddTranslation(text, path, translationKey)
	if err != nil {
		return "Error adding translation to " + fmt.Sprintf("%v", path)
	}

	return "Your translations have been added to all the files."
}
