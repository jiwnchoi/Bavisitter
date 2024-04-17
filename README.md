# Bavisitter: Babysitting LLMs for Visualization

<img width="1347" alt="image" src="https://github.com/jiwnchoi/Bavisitter/assets/2310571/6947496e-4275-4765-8d7b-f176740a6cad">

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
