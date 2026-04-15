# Fine-Tuning LLMs for Code Generation: Lessons Learned

*April 14, 2026*

---

## Introduction

Large Language Models (LLMs) have transformed the landscape of automated code generation. However, out-of-the-box models often struggle with complex, domain-specific programming tasks. Instruction tuning offers a powerful way to bridge this gap — but it traditionally demands significant computational resources.

In this article, I share practical insights from my thesis research on instruction-tuning **CodeLlama** models using **QLoRA** and **PEFT**, achieving meaningful benchmark improvements while reducing compute costs by over 99%.

## The Challenge

Fine-tuning a 7B parameter model typically requires:

- Multiple high-end GPUs
- ~1,351 hours of training time
- ~$4,000 in cloud compute costs

For most researchers and practitioners, this is simply out of reach.

## Our Approach

We applied **QLoRA** (Quantized Low-Rank Adaptation) to fine-tune only **0.37%** of the model's parameters. This approach:

1. **Quantizes** the base model to 4-bit precision
2. **Injects** small trainable adapter layers
3. **Trains** only these adapters while keeping the base model frozen

### Key Results

| Metric | Improvement |
|--------|-------------|
| HumanEval pass@1 | +6.7% |
| MBPP pass@1 | +7.1% |
| Failed test cases (unterminated code) | -97.3% |
| Training cost | $4,000 → $15 |
| Training time | 1,351 hours → 5 hours |

## Dataset Design

We created a custom **LeetCode-based dataset** featuring complex problems with Python implementations. Unlike simpler instruction datasets, ours targets:

- Multi-step algorithmic reasoning
- Edge case handling
- Efficient solution patterns

We also used **Llama 3** with the **Evol-Instruct** method to generate additional instructions, deliberately avoiding closed-source models like GPT.

## Takeaways

1. **Parameter-efficient methods work.** You don't need to fine-tune every weight to see meaningful gains.
2. **Dataset quality matters more than quantity.** Complex, well-structured training data outperforms larger but simpler datasets.
3. **Failure analysis is underrated.** Our detailed analysis of HumanEval failure cases revealed that most errors came from unterminated code blocks — a problem we reduced by 97.3%.

## What's Next

I'm currently exploring how these techniques can be extended to multi-language code generation and investigating the role of synthetic data quality in downstream performance.

---

*Have questions or want to discuss? Feel free to [reach out](mailto:claudiarichardxx@gmail.com)!*
