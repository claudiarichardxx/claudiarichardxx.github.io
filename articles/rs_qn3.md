**Do Training Objectives Actually Matter in Code Generation?**

Most instruction-tuned models are trained using a similar objective:
predict the next token given an input.

Even when we introduce instruction tuning, the underlying optimization
does not change much. The model still learns to generate the output
sequence token by token.

So this raises a natural question:

**If the objective stays almost the same, does modifying it even make a
difference?**

More specifically:

**Does Instruction Modelling (IM) improve performance over standard
Instruction Tuning (IT)?**

------------------------------------------------------------------------

**Setting Up the Comparison**

To explore this, two fine-tuning approaches were compared:

- **Instruction Tuning (IT)**: training on instruction–output pairs
  using standard next-token prediction

- **Instruction Modelling (IM)**: extending this setup by explicitly
  modeling the instruction, often applying loss to both the instruction
  and the output

Both methods were applied under identical conditions:

- Base models:

  - **CodeLlama-Python-7B**

  - **CodeLlama-Instruct-7B**

- Training setup:

  - **QLoRA-based fine-tuning**

  - LoRA rank = 100

  - 3 training epochs

- Dataset:

  - **LeetCode**

- Evaluation:

  - **HumanEval**

  - **MBPP** (3-shot setting)

------------------------------------------------------------------------

**Results on HumanEval**

**Table: HumanEval Performance (pass@1)**

| **Model** | **No FT** | **Instruction Tuning (IT)** | **Instruction Modelling (IM)** |
|----|----|----|----|
| CodeLlama-Python-7B | 38.4 | 44.512 | **45.121** |
| CodeLlama-Instruct-7B | 34.8 | 37.19 | **39.024** |

------------------------------------------------------------------------

**First Observation: IM Improves Performance (Sometimes Clearly)**

On HumanEval, Instruction Modelling consistently outperforms Instruction
Tuning:

- **CodeLlama-Python-7B** improves slightly:

  - 44.512 → 45.121

- **CodeLlama-Instruct-7B** shows a larger gain:

  - 37.19 → 39.024

This suggests that **explicitly modelling the instruction** helps the
model better interpret the task, especially for instruction-following
models.

At first glance, this seems straightforward: Better objective → better
performance

But the story changes when we look at another dataset.

------------------------------------------------------------------------

**Results on MBPP**

**Table: MBPP Performance (pass@1, 3-shot)**

| **Model** | **No FT** | **Instruction Tuning (IT)** | **Instruction Modelling (IM)** |
|----|----|----|----|
| CodeLlama-Python-7B | 44.512 | **51.6** | 46.6 |
| CodeLlama-Instruct-7B | 44.4 | 45.4 | **45.6** |

------------------------------------------------------------------------

**Second Observation: The Advantage Is Not Consistent**

On MBPP, the pattern shifts.

- For **CodeLlama-Python-7B**:

  - IT performs significantly better than IM

  - 51.6 vs 46.6 (a noticeable drop with IM)

- For **CodeLlama-Instruct-7B**:

  - IM slightly outperforms IT

  - but the difference is minimal

This breaks the earlier assumption.

If IM is strictly better, why does it underperform here?

------------------------------------------------------------------------

**What’s Actually Happening?**

At this point, the results are not pointing to a clear winner. Instead,
they suggest something more interesting:

**The effectiveness of the objective depends on the dataset and
evaluation setting.**

A few possible interpretations emerge:

- The CodeLlama-Python variant was primarily trained on just code and
  when instructions are given importance during finetuning, it
  underperforms on MBPP where the instructions are rather short/simple

- HumanEval focuses on correctness under strict evaluation, better
  instruction understanding (IM) helps

- MBPP (3-shot) provides examples in the prompt, the model may rely more
  on pattern matching, where IT is sufficient

- More complex objectives (IM) may introduce additional learning signals
  that are not always beneficial

This leads to an important realization:

**Changing the objective does not guarantee improvement, it changes what
the model prioritizes.**

------------------------------------------------------------------------

**A Deeper Insight**

Both IT and IM still rely on next-token prediction at their core.

The difference is subtle:

- IT learns *what to generate*

- IM tries to learn *how to interpret the instruction itself*

But this distinction only matters when:

- the task requires deeper understanding of the instruction

- or when the dataset does not already provide enough structure

Which might explain why:

- IM helps on HumanEval

- but does not consistently outperform on MBPP

------------------------------------------------------------------------

**So Do Objectives Matter?**

Yes, but not in the way we might expect.

The results suggest that:

- Objectives influence **how the model learns**, not just how well it
  performs

- Their impact depends on:

  - the dataset

  - the evaluation setup

  - the base model

And perhaps most importantly:

**Objectives alone are not the dominant factor.**

They interact with data and prompting in ways that are not always
predictable.

------------------------------------------------------------------------

**Final Thought**

It is tempting to assume that improving the training objective will
directly improve model performance.

But these results suggest otherwise.

Even small changes in objective design can lead to improvements in some
settings and regressions in others

Which leads to a more grounded conclusion:

**Better objectives do not guarantee better models, they simply change
what the model learns to focus on.**
