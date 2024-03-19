package main

import (
	"context"

	"github.com/luisbeqja/autoRR2/components"
	"github.com/luisbeqja/autoRR2/functions"
	"github.com/luisbeqja/autoRR2/types"
	"github.com/luisbeqja/autoRR2/ui"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	functions.CreateInitialConfig()
	a.ctx = ctx
}

func (a *App) AddConfigurationHandler(file string) string {
	return ui.AddConfigurationHandler(file)
}

func (a *App) DowloadConfigHandler() string {
	return ui.DowloadConfigHandler()
}

func (a *App) AddTranslationHandler(text string, path string, translationKey string) string {
	answer, err := components.OpenDialog(a.ctx, "Do you want to add this translation?", "all your translation will be added to your files", "Yes")
	if err != nil {
		return "Error opening dialog"
	}
	if answer == "YES" {
		return ui.AddTranslationHandler(text, path, translationKey)
	}
	return "Enter your translations here 👇"
}

func (a *App) AddSingleTranslationHandler(text string, path string, translationKey string) string {
		answer, err := components.OpenDialog(a.ctx, "Do you want to add this translation?", "", "Yes")
	if err != nil {
		return "Error opening dialog"
	}
	if answer == "YES" {
		return ui.AddSingleTranslationHandler(text, path, translationKey)
	}
	return "Enter your translations here 👇" 
}

func (a *App) AddFolderHandler(path string) []types.Lang {
	return functions.OpenFolder(path)
}
