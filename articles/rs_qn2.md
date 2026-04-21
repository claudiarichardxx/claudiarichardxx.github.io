**Does Fine-Tuning Actually Improve Code Models?**

Instruction tuning and parameter-efficient methods like LoRA and QLoRA
are widely used today. Most modern pipelines include some form of
fine-tuning.

But this leads to a very basic question that is often overlooked:

**Does fine-tuning actually improve performance over the base model?**

Or are pretrained models already strong enough that fine-tuning only
adds marginal gains?

------------------------------------------------------------------------

**Setting Up the Comparison**

To answer this, the performance of fine-tuned models was compared
against their original, non-fine-tuned versions.

The setup is straightforward:

- Base models:

  - **CodeLlama-Python-7B**

  - **CodeLlama-Instruct-7B**

- Fine-tuning method:

  - **Instruction Tuning using QLoRA**

  - LoRA rank = 100

  - Batch size = 2

  - 3 training epochs

- Dataset used for fine-tuning:

  - **LeetCode**

- Evaluation datasets:

  - **HumanEval**

  - **MBPP**

For MBPP, both:

- **0-shot** (no examples in prompt)

- **3-shot** (three input-output examples provided)  
  were evaluated.

The “no fine-tuning” results were taken from the original CodeLlama
paper.

------------------------------------------------------------------------

**Results on HumanEval**

**Table: HumanEval Performance (pass@1)**

| **Model**             | **Without FT (%)** | **With Instruction Tuning (%)** |
|-----------------------|--------------------|---------------------------------|
| CodeLlama-Python-7B   | 38.4               | **44.512**                      |
| CodeLlama-Instruct-7B | 34.8               | **37.19**                       |

------------------------------------------------------------------------

**What Changes After Fine-Tuning?**

The improvement is clear, but not uniform.

- **CodeLlama-Python-7B** improves significantly:

  - from **38.4 → 44.512**

  - a gain of ~6 points

- **CodeLlama-Instruct-7B** improves more modestly:

  - from **34.8 → 37.19**

This difference is interesting.

The Python-specific model benefits more from fine-tuning on LeetCode.
This suggests that:

- models already aligned for code generation can extract more value from
  structured datasets

- instruction-tuned base models may already be partially optimized for
  such tasks

Which leads to a subtle question:

**Does fine-tuning help more when the base model is specialized, or when
it is general?**

------------------------------------------------------------------------

**Results on MBPP**

**Table: MBPP Performance (pass@1)**

| **Model**             | **Without FT (%)** | **0-shot (%)** | **3-shot (%)** |
|-----------------------|--------------------|----------------|----------------|
| CodeLlama-Python-7B   | 44.512             | 49.0           | **51.6**       |
| CodeLlama-Instruct-7B | 44.4               | 44.6           | **45.4**       |

------------------------------------------------------------------------

**What Do These Results Tell Us?**

The pattern from HumanEval continues here.

For **CodeLlama-Python-7B**:

- performance improves in both settings

- the improvement is stronger in **3-shot evaluation (51.6%)**,
  suggesting that the model benefits from both fine-tuning *and*
  additional context

For **CodeLlama-Instruct-7B**:

- improvements are smaller

- the model already performs reasonably well without fine-tuning

This again points to an interesting observation:

**Fine-tuning does not impact all models equally.**

Its effectiveness depends on:

- how the base model was trained

- how aligned it already is with instruction-following tasks

- and how well the dataset complements its strengths

------------------------------------------------------------------------

**A More Important Insight**

Across both datasets, one pattern is consistent:

**Fine-tuning improves performance across all settings.**

But the magnitude of improvement varies.

This suggests that fine-tuning is not just adding new knowledge. It is
likely:

- reinforcing existing patterns

- aligning the model more closely with evaluation tasks

- improving how it interprets instructions

------------------------------------------------------------------------

**Where Does Parameter Efficiency Come In?**

All improvements here were achieved using **QLoRA**, a
parameter-efficient fine-tuning method.

This is important.

Because traditionally, improving performance required **full fine-tuning
(FFT)**, which:

- updates all model parameters

- requires significant compute and memory

But here:

- only a small subset of parameters is updated

- yet measurable improvements are achieved

This reinforces an idea that has been appearing repeatedly:

**Pretrained models already contain most of the required knowledge.
Fine-tuning simply helps extract it more effectively.**

------------------------------------------------------------------------

**Final Thought**

Fine-tuning clearly improves performance—but it does not do so
uniformly.

Some models benefit significantly. Others show smaller gains.

This suggests that fine-tuning is not a universal solution, but a
**context-dependent tool**, whose effectiveness depends on:

- the base model

- the dataset

- and the evaluation setting

Which leads to the next natural question:

**If fine-tuning improves performance, how much of that improvement
depends on *how* we fine-tune?**

------------------------------------------------------------------------
