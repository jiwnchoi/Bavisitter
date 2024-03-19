# Bavisitter: Babysitting LLMs for Visualization

<img width="1097" alt="image" src="https://github.com/jiwnchoi/Bavisitter/assets/2310571/086c3b72-7950-4dac-a8e2-79e53b01f3df">

```python
import os
from bavisitter import Bavisitter

os.environ["OPENAI_API_KEY"] = "sk-"
# If you are using different LLMs (e.g., Claude, Gemini) use different api keys.

bavisitter = Bavisitter(df, model="gpt-4-turbo-preview", color_mode="dark")
bavisitter
```

## Development

Install [pnpm](https://pnpm.io/installation) and [Hatch](https://hatch.pypa.io/latest/install/) to set up the development environment.

```shell
git clone https://github.com/jiwnchoi/bavisitter.git && cd bavisitter
pnpm install
hatch shell
pnpm dev
```
