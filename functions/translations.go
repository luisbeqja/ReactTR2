package functions

import (
	"bufio"
	"fmt"
	"os"
)

func AddTranslation(translation string, filePath string, translationKey string) error {
	file, err := os.Open(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	newLine := translationKey + ":" + "'" + translation + "'" + ","

	lines = append(lines[:1], append([]string{newLine}, lines[1:]...)...)

	output, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer output.Close()

	writer := bufio.NewWriter(output)
	for _, line := range lines {
		fmt.Fprintln(writer, line)
	}

	return writer.Flush()
}
