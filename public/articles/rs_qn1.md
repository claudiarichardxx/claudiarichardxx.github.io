**Can More Complex Data Actually Improve Code Generation?**

Most improvements in code-generating models are often attributed to
better architectures, larger models, or improved training techniques.
But a simpler question is worth asking:

**What if the dataset itself is the main driver of improvement?**

More specifically:

**Can instruction tuning on more complex datasets like LeetCode actually
lead to better code generation performance?**

------------------------------------------------------------------------

**Setting Up the Experiment**

To explore this, instruction tuning was performed using two base models:

- **CodeLlama-Python-7B**: a model specialized for Python code
  generation

- **CodeLlama-Instruct-7B**: an instruction-tuned variant designed to
  follow prompts more effectively

The models were fine-tuned using:

- **QLoRA** (Quantized Low-Rank Adaptation)

- **LoRA rank = 100**

- **Batch size = 2**

- **3 training epochs**

Evaluation was performed on the **HumanEval** dataset using the *pass@1*
metric (percentage of problems solved correctly in one attempt).

To understand the effect of dataset choice, results were compared
against:

- **CommitPackFT + OASST** — representing real-world + conversational
  data

- **CodeAlpaca** — representing synthetic instruction data

- **Full fine-tuning (FFT)** results from prior work

------------------------------------------------------------------------

**Results: Does Dataset Complexity Matter?**

Here is a direct comparison of performance across datasets and models:

**Table: Comparison of HumanEval Performance (pass@1)**

| **Dataset**                   | **Base Model**        | **Pass@1 (%)** |
|-------------------------------|-----------------------|----------------|
| CommitPackFT + OASST          | StarCoder-7B          | 32.01          |
| CommitPackFT + OASST          | StarCoder-16B         | 38.08          |
| CodeAlpaca                    | CodeLlama-Python-7B   | 41.463         |
| LeetCode (Instruction Tuned)  | CodeLlama-Instruct-7B | 35.975         |
| LeetCode (Instruction Tuned)  | CodeLlama-Python-7B   | **44.512**     |
| CodeAlpaca (Full Fine-Tuning) | CodeGeeX2             | 44.7           |
| CodeAlpaca (Full Fine-Tuning) | StarCoder             | 46.2           |

------------------------------------------------------------------------

**What Do These Numbers Actually Tell Us?**

A few patterns stand out immediately.

First, models trained on **CommitPackFT + OASST** show relatively lower
performance. Even with a larger model (StarCoder-16B), performance
reaches only **38.08%**, suggesting that increasing model size alone
does not compensate for dataset limitations.

Moving to **CodeAlpaca**, performance improves to **41.463%**,
indicating that structured instruction datasets already provide a
significant advantage over raw or conversational data.

But the most interesting result comes from the **LeetCode dataset**.

Despite having roughly the same number of samples (~2k) as CodeAlpaca,
instruction tuning on LeetCode with CodeLlama-Python-7B achieves
**44.512%**, which is:

- **+3.05 improvement over CodeAlpaca**

- **Significantly higher than CommitPack-based approaches**

This is not a small jump.

It suggests that **dataset complexity, and not just dataset size, plays
a critical role in performance**.

**A Subtle but Important Observation**

The LeetCode-based model performs **very close to full fine-tuning
results**:

- CodeGeeX2 (FFT): 44.7%

- StarCoder (FFT): 46.2%

- LeetCode + QLoRA: **44.512%**

This is interesting for two reasons.

First, **QLoRA is significantly more resource efficient than full
fine-tuning**, yet achieves comparable performance.

Second, it reinforces an earlier question:

**If efficient fine-tuning methods combined with better data can match
full fine-tuning, where is the real gain coming from?**

------------------------------------------------------------------------

**Why Does LeetCode Perform Better?**

The difference likely comes from the nature of the dataset.

Unlike synthetic instruction datasets, LeetCode problems:

- enforce correctness through test cases

- require handling edge cases

- involve constraints on time and space complexity

- demand structured reasoning

This creates a different learning signal.

Instead of learning what *looks correct*, the model is pushed toward
generating code that *is most efficient for the given problem*.

Which leads to a more fundamental question:

**Are most datasets teaching models how to respond, while datasets like
LeetCode teach them how to be correct?**

------------------------------------------------------------------------

**Final Thought**

The results suggest that improving code generation is not just about
better models or better tuning techniques.

It may simply come down to:

- what data the model sees

- how complex that data is

- and what kind of reasoning it enforces

Because if two datasets of similar size can produce a **3% performance
gap**, the difference must be structure.

And that raises the next question:

**If dataset complexity has this much impact, what happens when we
combine it with better objectives or training strategies?**
