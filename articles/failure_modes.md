**A failure mode analysis is here. What Actually Improves After Fine-Tuning?**

Most evaluation metrics tell us *whether* a model improves.

But they don't tell us **how** it improves.

A model going from 38% to 44% pass@1 is useful—but it hides something more interesting:

**What kinds of mistakes does the model stop making? And what kinds of mistakes remain?**

To answer this, failure cases from the HumanEval dataset were analyzed before and after fine-tuning.

---

**Before vs After: What Changes?**

Before fine-tuning:

- **105 failed cases**

After fine-tuning:

- **90 failed cases**

So the model improves, but not uniformly.

Instead of simply reducing errors, it **changes the type of errors it makes**.

---

**Categories of Failures**

The failed generations **were** grouped into a few recurring categories:

- **Failed test cases**: code runs but produces incorrect output

- **No code generated**: model outputs only comments or placeholders

- **Syntax / logic errors**: invalid or incorrect implementation

- **Unterminated code**: incomplete generations (cut off mid-logic)

- **Missing imports**: required libraries not included

- **Execution timeout**: inefficient or non-terminating logic

These categories reveal not just failure, but *why* the model fails.

---

**Example 1: Failing Test Cases (Overlapping Logic)**

Before fine-tuning, the model fails to handle overlapping substrings correctly:

```python
def how_many_times(string: str, substring: str) -> int:
    return string.count(substring)
```

After fine-tuning, the model explicitly handles overlaps:

```python
def how_many_times(string: str, substring: str) -> int:
    count = 0
    for i in range(len(string) - len(substring) + 1):
        if string[i: i + len(substring)] == substring:
            count += 1
    return count
```

---

**Example 2: No Code Generated → Complete Implementation**

Before fine-tuning, the model generates only comments:

```python
# TODO: Write your code here
pass
```

After fine-tuning, it produces a valid solution:

```python
def words_in_sentence(sentence):
    words = sentence.split()
    result = []
    for word in words:
        if is_prime(len(word)):
            result.append(word)
    return ' '.join(result)
```

---

**Example 3: Syntax / Logic Fix**

Before fine-tuning:

```python
return ' '.join(sorted(word, key=lambda x: ord(x)) for word in s.split())
```

After fine-tuning:

```python
def anti_shuffle(s):
    words = s.split()
    result = []
    for word in words:
        result.append(''.join(sorted(word)))
    return ' '.join(result)
```

**Example 4: Unterminated Code → Complete Logic**

Before fine-tuning, the generation is incomplete and incorrectly structured:

```python
for i in range(0, len(s), 2):
    if s[i].isupper():
```

After fine-tuning:

```python
def count_upper(s):
    count = 0
    for i in range(0, len(s), 2):
        if s[i].isupper() and s[i] in 'AEIOU':
            count += 1
    return count
```

---

**Example 5: Missing Imports**

Before fine-tuning:

```python
def sum_squares(lst):
    return sum([int(math.ceil(x) ** 2) for x in lst])
```

The math module is used but never imported, leading to runtime failure.

---

**Example 6: Execution Timeout**

Before fine-tuning:

```python
while poly(xs, x) != 0:
    x += 1
```

This loop may never terminate if no root exists.

---

**Table: Failure Distribution Before vs After Fine-Tuning**

| **Failure Type**                  | **Before FT** | **After FT** |
|-----------------------------------|---------------|--------------|
| Failed test cases                 | 46            | 81           |
| No code generated (only comments) | 14            | —            |
| Syntax / logic errors             | 7             | 5            |
| Unterminated code                 | 38            | 1            |
| Missing imports                   | —             | 2            |
| Execution timeout                 | —             | 1            |

---

**First Observation: Syntax Improves, Logic Becomes the Bottleneck**

The most striking change is here:

- **Unterminated code drops drastically** (38 → 1)

- **Syntax/logic errors reduce slightly**

This suggests that fine-tuning improves:

- code completeness

- syntactic correctness

- generation stability

In other words, the model becomes better at producing *valid code*.

But at the same time:

- **Failed test cases increase significantly** (46 → 81)

Which means:

The model is now producing *complete code*, but not necessarily *correct code* that passes all test cases.

---

**What Does That Mean?**

Before fine-tuning:

- many generations failed early (incomplete or invalid code)

After fine-tuning:

- more generations are complete

- more of them reach execution

- but fail at **logical correctness**

So the bottleneck shifts from:

"Can the model generate code?"

to:

"Can the model generate the *right* code?"

---

**Where Does Fine-Tuning Help?**

To understand improvements more clearly, only the cases that:

- **failed before fine-tuning**

- but **passed after fine-tuning**

were analyzed.

A total of:

- **22 out of 105 cases (~20%) were corrected**

---

**Table: Failure Cases That Were Fixed After Fine-Tuning**

| **Failure Type**      | **Cases Fixed** |
|-----------------------|-----------------|
| Failed test cases     | 9               |
| No code generated     | 4               |
| Syntax / logic errors | 1               |
| Unterminated code     | 8               |

---

**Second Observation: Most Gains Come From Structural Fixes**

The improvements are not evenly distributed.

The biggest gains come from:

- **Unterminated code → fixed (8 cases)**

- **Previously missing implementations → generated (4 cases)**

This reinforces something important:

Fine-tuning helps the model **finish what it starts**

It improves:

- completeness

- structure

- basic execution readiness

But contributes less to:

- deeper reasoning

- complex logic corrections

---

**Example: From Partial to Correct**

In one case, the model initially generated only comments without any implementation.

After fine-tuning, it produced a working solution:

- splitting the sentence

- checking word lengths

- applying the required condition

This is a clear improvement in **task completion**, not just syntax.

---

**Example: Fixing Overlapping Logic**

Another example involved counting overlapping substrings.

Before fine-tuning:

- the model used a simple .count() approach

- failed on overlapping cases

After fine-tuning:

- explicitly iterated over indices

- correctly handled overlaps

Here, the improvement is not just structural, it reflects **better problem understanding**

---

**A Subtle but Important Shift**

Across all cases, a pattern emerges:

- **Before fine-tuning** → failures are mostly *surface-level*

- **After fine-tuning** → failures move deeper into *logic-level issues*

This is a meaningful transition.

It suggests that fine-tuning:

- reduces trivial errors

- pushes the model toward more meaningful mistakes

Which, in a way, is progress.

---

**Final Thought**

Fine-tuning does not simply reduce errors, it **reshapes them**.

It improves:

- syntactic correctness

- code completeness

- basic implementation

But exposes a harder problem: **logical correctness under constraints**

Which leads to a deeper realization:

Improving code generation is not just about generating valid code, it is about generating code that *survives evaluation*.

And that raises the next question:

**If fine-tuning fixes structure, what actually improves reasoning?**

---
