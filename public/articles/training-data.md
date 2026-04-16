**What Are We Actually Training Code Models On?**

Instruction tuning has been consistently improving the performance of
code-generating models. Benchmarks go up, newer models outperform older
ones, and metrics like pass@k show clear gains. But once you look past
the results, a more important question starts to emerge:

**What exactly is changing during this process - data, objectives, or
something deeper?**

Because if performance is improving, something in the pipeline is doing
most of the work. And it is rarely just one thing.

**Data: More Isn't Always Better**

A large part of a model's capability comes from the data it is trained
on. But in code generation, the differences between datasets are not
just about size, they are about **structure and complexity**.

Some commonly used datasets include:

- **CodeAlpaca**: a synthetic instruction dataset where each sample
  contains an *instruction, input, and output*, generated using models
  like GPT

- **CommitPack (CommitPackFT)**: derived from GitHub commits, pairing
  code changes with commit messages

- **OASST**: a multi-turn conversational dataset, with limited code
  content

- **CodeSearchNet**: code paired with natural language descriptions from
  GitHub repositories

| Dataset             | Size          | Contents                          | Models/papers |
|---------------------|---------------|-----------------------------------|---------------|
| CommitPackFT        | 702,062 (70k) | GitHub commits                    | OctoCoder     |
| OASST               | 8,587 (8k)    | Multi-turn chat dialogues, only a few code lines | OctoCoder |
| CodeAlpaca          | 20k           | Self-Instruct                     | CodeAlpaca    |
| Evolved Alpaca      | 78k           | CodeAlpaca + Evol-Instruct        | WizardCoder   |
| CodeSeaXDataset     | 19,915 (19.9k)| CodeSearchNet (GitHub) + Self-Instruct | WaveCoder |
| CodeExercise-Python | 27k           | Self-Instruct                     | MFTCoder      |

At a glance, these datasets differ in format. But the more important
difference is how much **reasoning** they demand.

Synthetic datasets like CodeAlpaca are effective for teaching models how
to follow instructions. But they often lack the depth required for
solving structured problems. But could we find a better dataset that
teaches handling edge cases, optimizing complexity, and reasoning under
constraints? Something like the **LeetCode** dataset?

So the question becomes:

**If a model is trained mostly on simpler instruction datasets, can it
truly generalize to harder problems?**

**Synthetic Data: Scaling Intelligence or Reinforcing Patterns?**

A significant portion of instruction tuning relies on synthetic data
generation.

Methods like *Self-Instruct* and *Evol-Instruct* expand datasets by
generating new instructions from existing ones. Evol-Instruct, for
example, iteratively increases the complexity, breadth, or simplicity of
instructions, creating multiple variations per sample.

This approach is efficient. It removes the need for manual annotation
and scales quickly.

But it introduces a subtle concern:

**If models are generating training data for other models, are we
improving quality, or just reinforcing existing patterns?**

There is some evidence that smarter data selection may matter more than
scale. The LESS method (*Low-rank Gradient Similarity Search*) selects
only a subset of training data based on gradient similarity. Models
fine-tuned on just **5% of carefully selected data** have been shown to
outperform models trained on the full dataset.

Which shifts the question again: **Is better data selection more
important than more data?**

**Instruction Tuning: Why Do We See Such Large Gains?**

Instruction tuning changes how models interpret inputs. Instead of
learning generic patterns, they learn to follow explicit instructions.

The impact is significant:

- **OctoCoder** → \~38% improvement over base StarCoder

- **WaveCoder** → \~29.2% improvement over DeepSeekCoder-Instruct

- **WizardCoder** → \~23.7% improvement over StarCoder

- **MFTCoder** → \~17.07% improvement over CodeLlama

These improvements are measured using *pass@k*, which evaluates whether
at least one of the top *k* generated outputs passes all test cases.

Some approaches focus on improving the **data** (e.g., Evol-Instruct),
others modify the **training objective** (e.g., Instruction Modelling,
Code Comparison Tuning), while some introduce **reinforcement learning**
methods like PPO or improve efficiency using parameter-efficient
techniques like LoRA.

Rather than a single improvement, instruction tuning appears to be a
combination of multiple smaller design choices, some choices like data
appear to be making a huge difference.
