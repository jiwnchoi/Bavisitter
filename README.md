# Bavisitter: Babysitting LLMs for Visualization

![teaser](/assets/demo.png)

**Bavisitter** is visual analytics-centered LLM client.

## Get Started

[![open-in-colab](/assets/open-in-colab.svg)](https://colab.research.google.com/github/jiwnchoi/Bavisitter/blob/main/demo.ipynb)

```python
!pip install bavisitter

import os
from bavisitter import Bavisitter

os.environ["OPENAI_API_KEY"] = "sk-"

Bavisitter(df, model="gpt-4o", color_mode="dark")
```

### Using Multiple LLM Provider

By leveraging [LiteLLM](https://docs.litellm.ai), you can use diverse LLMs by simply changing the model string. Check [LiteLLM document](https://docs.litellm.ai/docs/providers) for supported providers

## Development

Install [pnpm](https://pnpm.io/installation) and [Hatch](https://hatch.pypa.io/latest/install/) to set up the development environment.

```shell
git clone https://github.com/jiwnchoi/bavisitter.git && cd bavisitter
pnpm install
pnpm dev # Runs Vite dev server and Jupyter Lab
```

## Reference

### Bavisitter: Integrating Design Guidelines into Large Language Models for Visualization Authoring

[Jiwon Choi](https://jiwnchoi.me), [Jaeung Lee](https://github.com/gnueaj), and [Jaemin Jo](https://github.com/e-)

Proceedings of Conference on 2024 IEEE Visualization & Visual Analytics (IEEE VIS), Tampa Bay, USA

[![pdf-icon](https://img.shields.io/badge/Paper-PDF-red)](/assets/bavisitter.pdf)

```bibtex
@inproceedings{choi2024bavisitter,
  title={Bavisitter: Integrating Design Guidelines into Large Language Models for Visualization Authoring},
  author={Choi, Jiwon and Lee, Jaeung and Jo, Jaemin},
  booktitle={2024 IEEE Visualization and Visual Analytics (VIS)},
  year={2024},
  organization={IEEE}
}
```
