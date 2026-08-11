# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey atsekhan!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/atsekhan/skills-build-applications-w-copilot-agent-mode/issues/1)

## Frontend env configuration

The React app depends on `VITE_CODESPACE_NAME` for Codespaces-hosted API calls. Define it in `octofit-tracker/frontend/.env.local` before running the app, for example:

```bash
VITE_CODESPACE_NAME=my-codespace-name
```

When it is unset, the app falls back to `http://localhost:8000` instead of generating `https://undefined-8000...` URLs.


