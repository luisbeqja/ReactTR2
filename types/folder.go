package types

type Lang struct {
	FileName    string
	FileContent string
}

func MakeNewLang(fileName string, fileContent string) Lang {
	return Lang{
		FileName:    fileName,
		FileContent: fileContent,
	}
}