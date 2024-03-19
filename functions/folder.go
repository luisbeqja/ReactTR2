package functions

import (
	"log"
	"os"
	"strings"

	"github.com/luisbeqja/autoRR2/types"
)

func OpenFolder(path string) []types.Lang {
	var langFile []types.Lang
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	for _, e := range entries {
		langFile = append(langFile, types.MakeNewLang(e.Name(), ReadFile(path+"/"+e.Name())))
	}
	return langFile
}

func ReadFile(filePath string) string {
	// Open the file
	file, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Read the file
	stat, err := file.Stat()
	if err != nil {
		log.Fatal(err)
	}

	bs := make([]byte, stat.Size())
	_, err = file.Read(bs)
	if err != nil {
		log.Fatal(err)
	}

	return strings.Replace(string(bs), "export default", "", 1)
}
