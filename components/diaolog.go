package components

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func OpenDialog(ctx context.Context, title string, message string, defaultButton string) (string, error) {
	selection, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Title:         title,
		Message:       message,
		Buttons:       []string{"YES", "NO",},
		DefaultButton: defaultButton,
	})
	return selection, err
}
