**Objectives: Are We Optimizing the Right Thing?**


While a wide range of objectives have been explored, it is important to
separate **pretraining** from **fine-tuning**.

During pretraining, models are trained on large datasets using
objectives such as:

- **CLM (Causal Language Modeling)**: predicting the next token in a
  sequence

- **MLM (Masked Language Modeling)**: predicting randomly masked tokens

- **SC (Span Corruption)**: masking spans of text instead of individual
  tokens

- **DAE (Denoising Autoencoding)**: reconstructing clean input from
  noisy input

- **FIM (Fill-in-the-Middle)**: generating missing code segments within
  context

- **CL (Contrastive Learning)**: distinguishing correct vs incorrect
  representations

These objectives help the model learn general patterns in language and
code.

![Training objectives overview](/files/objectives.png)

Fine-tuning, however, is much more uniform than it appears.

Most instruction tuning and supervised fine-tuning pipelines still rely
on **next-token prediction**. The model is trained to generate the
output sequence given an instruction and input. The objective does not
change significantly, the **data format does**.

This introduces two closely related ideas:

- **Instruction Tuning**: training the model on instruction--output
  pairs so it learns to follow tasks

- **Instruction Modelling (IM)**: extending this by explicitly modeling
  the instruction itself, applying loss to both instruction and output

**Beyond Text: Can Models Understand Code Structure?**

One limitation of traditional objectives is that they treat code as
plain text. But code has structure - variables interact, values flow,
and logic follows strict rules.

To address this, several approaches introduce **structure-aware
objectives**.

- **AST (Abstract Syntax Tree)** represents code as a hierarchical
  structure of operations

- **DFG (Data Flow Graph)** captures how values move between variables

- **Graph-based models** like GraphCodeBERT incorporate data flow into
  training

- **CodeT5** introduces identifier-aware objectives to help models
  understand variable roles

These methods aim to move beyond surface-level patterns and capture the
underlying semantics of code.

Some approaches modify the architecture itself to support these
representations, while others integrate structure into the training
objective without changing the model design.

The idea is simple:

**If code is structured, why should training ignore that structure?**

The variety of objectives explored in code models is broader than it
initially appears.

While many variations exist, most models still rely heavily on CLM
during pretraining. Structure-aware objectives are introduced
selectively, and often inconsistently across models.

Which makes the following question difficult to ignore:

**If better objectives exist, why do most models still default to
next-token prediction?**

**So Where Are These Gains Coming From?**

Across different approaches, three factors consistently influence
performance:

1.  **Data quality and complexity** - more realistic datasets improve
    reasoning ability

2.  **Instruction design** - clearer and more diverse instructions
    improve generalization

3.  **Training objectives** - structure-aware objectives improve
    understanding

But these factors are often explored independently.

Which leads to an open question:

**Are we optimizing each component separately, while missing how they
interact?**

**Final Thought**

Instruction tuning has clearly improved code-generating models.
Performance increases, benchmarks improve, and models become more
capable.

But the process still feels fragmented. Different datasets, different
objectives, different tuning strategies- all contributing in ways that
are not fully understood.
