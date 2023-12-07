---
title: Example Title
draft: True
tags: 
- example-tag
---
☞ Fingers lead

---




---

# `Statistics and Probability`


---

###### Q: **What does it mean to approximate a binomial distribution with a normal distribution? When do we prefer to do this over using the exact binomial distribution?**

- sufficiently large N 

###### QX: **What are the general constraints on the normal approximation for a binomial distribution?**
`Source: Statistics and Probability Theory` #statistics #binomial #📊

A: The normal approximation to the binomial distribution is generally considered appropriate when both of the following conditions are met:

1. The sample size $n$ is large. There is no hard-and-fast rule, but a common guideline is that $n$ should be at least **$30$**. 
2. The probabilities of success $p$ and failure $q = 1 - p$ are not too close to 0 or 1. A common guideline is that both $np$ and $nq$ should be greater than $5$.

$$np > 5$$
$$np(1-p) > 5$$

*These conditions help ensure that the binomial distribution is sufficiently "bell-shaped" for the normal approximation to be useful.*

[a drawing of a binomial that is too skewed]  to explain

###### Q: **What are some properties of the normal distribution**

- Sum of normal RV's is normal 
- Move this 

###### QX) **Bonus: state the pdf of the normal distribution**

$$f_X(x) = \frac{1}{\sqrt{2 \pi \sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

---

###### QX) **A client gives you a dataset with ~50 datapoints and asks you to quickly classify the 'outliers' - how would you do it?**

**Use the formula** 
$$\{x : \hat{Q}_1 - 1.5\cdot \hat{IQR}\}$$

---

###### QX) **In statistics, we must make a choice of quantile estimates. Given the datapoints plotted on the true distribution below, draw how TYPE-7 quantiles would partition the data.**

**NB:** this only really matters if our sample size is small; for large $n$, the differences are negligible. 

<br>

---

###### **The CTO is interested in knowing whether the new feature is due to random chance or something else. How would you do it - introducing the AB test**


---

#### Q1) Case Study | 'Rudimentary Aesthetics'
*Imagine you're a data scientist working for an e-Commerce website 'Rudimentary Aesthetics'. The design team has proposed a new layout for the product page. Explain the A/B test you'd set up and discuss how randomness and independence are important at each step.*

**Explanation**
> ☞ An A/B test is a statistical experiment where 'version A' is compared to 'version B' to determine which performs better in achieving a specific goal. In this context, the variable is the product page layout, and the goal could be maximizing sales or clicks on the "Add to Cart" button.

*For the A/B test for 'Rudimentary Aesthetics':*

1. **Setup**: 
   - **Version A**: The original layout (the **control group**)
   - **Version B**: The new layout proposed by the design team.

2. **Visitor Assignment**: Visitors to the 'Rudimentary Aesthetics' website are randomly and independently assigned to either Version A or Version B. 
   
   - **Importance**: Random assignment ensures each layout has a mix of all types of visitors, thereby minimizing biases. Independence ensures one visitor's experience doesn't influence another's. If the assignment isn't independent and random, the results could be skewed.

3. **Purchase Decision**: The decision of one visitor to make a purchase should ideally be independent of another's.
   
   - **Importance**: Suppose customers discuss products on external forums, and one customer influences another's decision. This violates the independence assumption, skewing the results. The effect of the design change could be confounded with these external influences.

4. **Data Collection**: Track metrics of interest, like sales or "Add to Cart" clicks, for each version.

5. **Analysis**: Compare the performance metrics of Version A and Version B to determine if the observed differences are statistically significant.

6. **External Factors**: Ensure external influences affect both groups equally and independently.
   
   - **Importance**: External events, like a marketing campaign, can distort results. Increased metrics might be mistakenly attributed to the design change instead of the external event.

**Outcome**: If one version outperforms the other significantly, 'Rudimentary Aesthetics' can implement that design for all users. Without randomness and independence at each step, results could mislead, leading to suboptimal decisions.

###### Follow up: **How would you address potential confounding variables or biases that could affect the A/B test results?**

**Explanation**:

Addressing potential confounding variables and biases is vital:

1. **Random Assignment**: Assign users randomly to minimize selection biases and ensure groups are comparable.
 
2. **Control for Confounders**: Control for variables like time of day or demographics using stratification or regression.

3. **Blinding**: Neither participants nor analysts should know which version a user saw, preventing biases.

4. **Duration**: Run the test longer to capture variations and seasonality.

5. **Pilot Testing**: Run a small-scale test to detect setup issues.

6. **Multiple Metrics**: Analyze various metrics for a holistic understanding and cross-check findings.

By addressing these biases and confounders, the validity and reliability of A/B test results can be improved.

<br>

---

#### Q2) Case study: `Petflix`
***Petflix**, a subscription-based platform for pet videos, has seen rapid growth but now faces challenges with customer retention and monetizing their user base. As a data scientist at Petflix, you are tasked to leverage data to optimize customer experience and drive revenues. During your interview, you are asked the following questions about your approach...*

<br>

###### Q2.1) **Given Petflix's diverse customer base, how would you go about predicting the revenue from a particular customer segment?**
`Topic` #💰

**Predicting customer revenue for Petflix would require regression analysis**. By collecting data on various customer segments and their interaction with the platform, like the frequency of watching videos, preferences for pet types, and responses to advertisements, we could train models like **Linear Regression**, **Random Forest**, or **Gradient Boosted Trees** to predict revenue from specific segments.

###### Q2.2) **Considering Petflix's monthly subscription model, how would you model churn for different time frames, such as predicting if a user will cancel their subscription in the next 1, 2, or 3 months?**
`Topic` #⌛

- **Churn prediction for Petflix users involves a classification approach**. To predict churn in different time windows, labels would be constructed for each time frame in the dataset. 
- Then, models like logistic regression, decision trees, or neural networks can be trained using past user engagement metrics and preferences as features.


> ⚠️ (common mistake icon)
> Rather than just creating the binary label `churn` or `did not churn`
> It is better to have multiple labels, i.e: 
> `Churns at any point in the future`
> `Churns in 1 month`
> `Churns in 3 months`
> `Churns in 6 months`
	Knowing **when** they are likely to churn is more valuable than the simple binary 'will churn or not churn', since you don't know whether this means next week, or in 5 years time. 


###### Q2.3) **How would you prepare your data for this?**

1. **Gather historical data**: Both on those who have churned and remained. Brainstorm features using domain knowledge, exploratory analysis, etc. Features could include user activity metrics, engagement scores, billing information, support ticket history, etc.
3. **Handle Missing Values**: Depending on the nature and amount, I would either impute them using methods like mean or median imputation, forward or backward fill, or sometimes remove them altogether.
4. **Feature Engineering**: Based on domain knowledge, I'd create new features that might have predictive power, like '`days_since_last_login`' or '`average_session_duration`'
5. **Encode Categorical Variables**: Techniques like one-hot encoding or ordinal encoding would be used based on the variable nature.
6. **Normalization/Standardization**: Especially for algorithms sensitive to feature scales (like logistic regression or SVMs), I'd normalize or standardize the features.
7. **Handle Class Imbalance**: If churn events are rare (as they often are), techniques like oversampling, undersampling, or using synthetic data generation methods like **SMOTE** can be considered.

###### Q2.4) **Recently, Petflix observed an unexpected spike in users cancelling their subscriptions. How would you investigate the possible reasons behind this trend?**
`Topic` #🔍

**To determine the reason behind the surge in churn rate for Petflix, I'd start with exploratory data analysis**. 
Try clustering the users and see whether 
Correlating churn with platform updates, recent content additions, or changes in pricing could help identify potential reasons. Feature importance in models like Random Forest or XGBoost can spotlight which factors are most associated with the churn increase.

###### Q2.5) **How would you identify the characteristics that make a 'good' customer of Petflix?**
`Topic` #👥

**To determine the characteristics of a 'premium' viewer on Petflix, we'd focus on engagement and value metrics**. Using feature importance techniques\*, we can identify attributes like frequency of viewing, content sharing, or even feedback submission as indicators of a premium viewer. Training a model on these features will highlight the most influential attributes.

\* We will go through some later

###### Q2.5) **Petflix's user data contains information like user's preferred pet type (cat, dog, bird, etc.). How would you prepare this categorical data for a model that only processes numerical inputs?**
`Topic` #🔄

**For encoding categorical features like preferred pet types in Petflix's dataset, techniques like one-hot encoding can be applied**. Each pet type gets its own binary column. If there's a discernible order or hierarchy in the categories, sequential encoding might be suitable.

###### Q2.6) **Considering Petflix operates globally and has a large variety of zip codes in the user data, how would you manage this feature with such high cardinality?**
`Topic` #📊

**Handling the high cardinality of zip codes in Petflix's user data involves grouping**. Instead of encoding every unique zip code, it would be more efficient to group these into broader geographical categories like regions, countries, or continents. This strategy reduces dimensionality while preserving geographical insights.

<br>

---

###### QX) **You mentioned feature importance techniques before. Would you be able to list a few examples?** 

- **If dealing with linear models - look at the coefficients.**
	- *For linear regression and logistic regression, the coefficients associated with each feature indicate the change in the response variable for a one-unit change in the feature.*
	- *Larger absolute values of coefficients imply more influence on the target variable, assuming the features are normalized.*
- **Gini importance/Mean decrease in impurity**
	- *Commonly used in decision trees and their ensemble counterparts (Random Forests, Extra Trees). 
	- *This method calculates the total decrease in node impurity (usually measured by Gini impurity) averaged over all trees of the forest that results from splits over a particular feature.*
- **Permutation feature importance**
	- *After a model has been trained on a set of features, their values are randomly 'shuffled', thus breaking their relationship with the target variable*
	- *Then, the decrease in the models performance (measured in accuracy or $R^2$) is measured.*
	- *A large decrease indicates **high importance***
- **Drop-Column method**
	- *Pretty self-explanatory: train the model on all features, and then retrain after dropping one feature.* 
	- *Again, the difference in the model's performance is indicative of the feature's importance.* 
- **SHAP - Shapley Additive Explanation Values** 
	- *SHAP values provide a unified measure of feature importance across various models by computing the average contribution of each feature value to every possible prediction.* 
	- *It is grounded in cooperative game theory and ensures consistent and fairly distributed feature importance values.*
- **LASSO Regression (L1 Regularization)**
	- *LASSO (Least Absolute Shrinkage and Selection Operator) regression adds an L1 penalty on the coefficients, which can drive some feature coefficients to zero.* 
	- *Features with non-zero coefficients are those selected by LASSO as significant.*

###### QX.1: Follow up: **Explain the difference in using Permutations vs Drop-column for feature importance**

- **The Drop-column method** tends to be more **accurate**, but also more computationally expensive 
- **The Permutation method** may be more **robust** as it accounts for potential interactions between features. 

###### QX.2: Follow up: **Can you use PCA to measure feature importance?**

- PCA is used primarily for dimensionality reduction 
- It doesn't directly give feature importance in the original feature space
- The magnitude of each feature to the principal component may be insightful, but it's more about the relationship of features to each component rather than a straightforward ranking of feature importance.

###### QX.3: Follow up: **How could you measure feature importance in a neural network?**

Measuring feature importance in a neural network is more challenging than in traditional models because of the network's complex, non-linear nature. However, techniques like connection weights, which sum the product of input values and their corresponding weights, can provide some insight. Additionally, methods like Permutation importance or Integrated Gradients, which consider the effect of input changes on the output, can be applied to deep learning models to obtain a more interpretable measure of feature significance.

<br>

---


###### QX) **List ALL the nomenclature for $x$ and $y$ variables in the context of modelling

stats section


| $x$ variable synonyms | $y$ variable synonyms |
|---------------------------|---------------------------|
| Explanatory               | Response                  |
| Predictor                 | Outcome                 |
| Independent               | Dependent                   |
| Feature                   | Target                    |
| Input                     | Output                    |
| Regressor                 | Criterion                 |
| Covariate                 | Endogenous                |
| Factor                    | Event                     |

<br>

---


---

#### Case Study | Zwitter
**

https://youtu.be/sD468LfeVdc?si=lM6fPQxumePlJnZQ


<br>

---

###### Q3: **How do you keep track of a model's performance once it's been deployed, to ensure validity and relevancy?**



1. **Logging Predictions**: Log and store model predictions to analyze later.
2. **Feedback Loop**: Implement a system where end-users can provide feedback on model predictions.
3. **Performance Metrics**: Regularly compute metrics like accuracy, F1-score, and others based on real-world predictions.
4. **Anomaly Detection**: Monitor for sudden changes in model behavior or input data distributions.
5. **Dashboards**: Use monitoring dashboards to visualize model metrics in real-time.

<br>

---

###### Q4: **Why might a model not be performing as well as initially intended?**

**Explanation**: Several reasons might cause a model's underperformance:
1. **Overfitting**: The model may have memorized the training data, leading to poor generalization on unseen data.
2. **Data Quality**: Issues like missing values, outliers, or noise can affect performance.
3. **Feature Relevance**: The model might lack essential features or might be considering irrelevant ones.
4. **Model Complexity**: The chosen model might be too simple or too complex.
5. **Data Drift**: The distribution of real-world data may change over time, making the model outdated.
6. **Incorrect Evaluation Metric**: The metric used to evaluate model performance might not align with the business objective.

<br>

---

###### Q5: **Why might a recommender system not be performing as well as initially intended, especially in big apps like Netflix, Spotify, or Canva?**

1. **Cold Start Problem**: Recommending items for new users or recommending new items to users can be challenging without sufficient data.
2. **Diversity vs. Accuracy**: Over-optimizing for accuracy can lead to a lack of diversity in recommendations.
3. **Changing User Preferences**: Users' preferences can evolve over time, making old data less relevant.
4. **Scalability Issues**: Handling recommendations for a vast number of users and items in real-time can be computationally challenging.
5. **Feedback Loops**: If the system continuously recommends a certain type of content, users might only interact with that, leading to biased future recommendations.
6. **Popularity Bias**: Recommender systems might overly focus on popular items, overshadowing niche ones.

<br>

---

###### Q3.1) List three different methods for quantifying the 'impurity' of a leaf node in a decision tree

- Gini Impurity
- Entropy
- Information Gain

###### Q3.2) Follow up: step me through calculating the Gini Impurity of this leaf node

| Likes chocolate | Does not like chocolate |
|------|-----|
| 18 | 3 |


<br>

---

###### QX) **Since most machine learning algorithms require numerical input, tell me some methods we use to 'encode' categorical variables**

`For example: Race = 'Caucasian', 'African', Asian', 'Hispanic'`

1. **One-Hot Encoding (Dummy Encoding):** For each level of the categorical variable, a new binary column is created. Each observation receives a "1" in the column for its corresponding category and "0" in all other new columns.

2. **Label Encoding:** Assign each category a unique integer. This is typically done in an arbitrary order, but sometimes an ordinal relationship is maintained if present in the variable.

3. **Ordinal Encoding:** Similar to label encoding, but the integers are assigned based on the order of the categories. Useful for ordinal variables where the order of categories is meaningful.

4. **Binary Encoding:** This technique first assigns integer labels, then converts these integers into binary code, so each binary digit gets a separate column. It's a compromise between one-hot and label encoding.

5. **Frequency (or Count) Encoding:** Categories are encoded based on their frequency or count in the dataset.

6. **Target (Mean) Encoding:** For supervised learning tasks, categories are encoded based on the mean of the target variable per category. It can lead to overfitting, so it's essential to be cautious.

7. **Embedding Layers (for Neural Networks):** In deep learning, especially with high cardinality data, an embedding layer can be used to convert categorical variables into dense vectors of fixed size that can be trained along with the neural network.

8. **Hashing:** The hash of the category is taken as a value. This method is useful when the cardinality of categorical variables is extremely high.

9. **BaseN Encoding:** Generalization of binary encoding where categories are represented as base N numbers. Binary and one-hot are special cases where N is 2 and 1, respectively.

10. **Leave-One-Out Encoding:** Similar to target encoding but leaves out the current row's target when calculating the mean target for a level to reduce the risk of overfitting.

11. **Weight of Evidence (WoE) Encoding:** It's used to encode a categorical variable based on the odds of the target variable. It's mainly used in logistic regression-based problems.

When choosing a method, it's essential to consider the nature of the categorical variable (nominal vs. ordinal), the algorithm being used (some algorithms can handle categorical data directly), the cardinality of the categorical variable, and the risk of introducing multicollinearity or overfitting. Always validate the chosen encoding method's effectiveness on your specific problem using cross-validation or a separate validation set.


>**Dense Vectors:** In the context of vectors, "dense" means that most of its elements are non-zero. This is in contrast to "sparse" vectors where most elements are zero. In machine learning, especially in embeddings, a dense vector is used to represent information in a compact form, where each element carries some semantic meaning.


> **Cardinality:** Cardinality refers to the number of unique values or categories in a variable. For a categorical variable, it's the total number of different categories it can take on. For example, a variable like "gender" typically has a low cardinality (e.g., male, female, non-binary), whereas a "user_id" column might have very high cardinality with each user having a unique ID.

<br>

---

###### Q12.1) **What is `TF-IDF` vectorization?**

**Term Frequency-Inverse Document Frequency (TF-IDF)** is a statistical metric used to assess the **relevance** of a word in a document (cluster), relative to a corpus. Commonly used in information retrieval and NLP, TF-IDF balances term frequency within a document against its rarity across all documents.

$$TF \cdot IDF = tf_{x, y} \cdot log_e(\frac{N}{df_x})$$
$x$ : the word
$y$ : the document 
$tf_{x, y}$ : frequency of word $x$ within $y$ 
$df_x$ : the number of documents containing the word
$N$ : the total number of documents in the corpus

**Explanation:** A high TF-IDF score arises when a term is frequent in a single document but rare across the corpus. This serves to highlight terms that are most indicative of each document's unique subject matter.

The **TF-IDF** value increases proportionally to the frequency of the word within the document (term-frequency), but this is offset by the second part of the equation, which **penalizes** words that are very common across all documents. 

**Example:** the word *'the'* would have low TF-IDF. For example: even though it occurs many times in one book, the word *'the'* is not rare - it will be in all other books as well.

###### Q12.2) **Which part of the equation is the 'reward'?

The **reward** is simply the part within the $log()$: 
$$\text{reward} = \frac{N}{df_x}$$
which is the total number of documents **divided by** the number of documents containing the **word**. The reward will be **low** if the word is very common, and **high** if it is very rare. 

<br>

###### Q12.3) **Why do you take the $log_e$ of the reward?**

*Any one of these (this is good general intuition to have, as we often take $log_e$ of things)*

1. **Scaling**: Logarithm dampens the effect of rare terms, preventing them from overshadowing the **term frequency**.
2. **Smoothing**: Logarithm ensures that the IDF value decreases **gradually**, not **drastically**, as term frequency increases.
3. **Sublinearity**: Logarithmic scaling captures the idea that term importance doesn't increase **linearly** with frequency.
4. **Sparsity**: Logarithm reduces the range of IDF values, aiding **numerical stability**.
5. **Intuition**: Logarithm intuitively balances the impact of term **rarity** and presence.

<br>
###### 𝐪12.4) **On a website about food, we are interested in knowing the importance of the term 'gradient descent' to a particular page ⁂ . On this page, 'gradient descent' appears a few times. Would the TF-IDF be small or large, and why?**

The TF-IDF would be **large**, because:
a) the term is reasonable frequent on the given page. (High term frequency)
b) the term most likely does not appear on any other page. (High reward)

> ⁂ Maybe it's a recipe on... random forest mushrooms

<br>

---

###### **Monte Carlo Simulations allow you to empirically answer complex probabilistic questions**

> ☞ ***Empirically*** is a confusing word but very useful to know. 
> This term refers to knowledge or results obtained through observation or experimentation, rather than through theoretical analysis or mathematical derivation. In simpler terms, when something is determined "empirically," it's based on what's actually observed or tested, rather than on theory alone.

---

###### QX) **Could you come up with an example which illustrates the difference between 'empirical' and 'theoretical'**

**The Boiling Point of Water at Different Altitudes**: Suppose a scientist theorizes that water will boil at a different temperature on top of a mountain compared to at sea level. The theory is based on the principle that atmospheric pressure decreases with altitude, which should affect the boiling point.

1. **Theoretical Approach**: The scientist could use mathematical equations and principles from thermodynamics to calculate the expected boiling point at a specific altitude.

2. **Empirical Approach**: The scientist travels to different altitudes and actually boils water, measuring the temperature at which it boils at each location.

By using the empirical approach, the scientist gathers data based on direct observation and experimentation, confirming or challenging the theoretical predictions. In this case, the scientist might find that water boils at, say, 95°C at 2,000 meters above sea level, rather than the 100°C boiling point at sea level. This result was determined empirically through direct testing and observation.

---

PCA variance explained vs. correlation 

Apples to oranges 
Correlation is a measure of: SHOULD KNOW THIS PERFECTLY + THE FORMULA 

<br>

---

<br>


###### Q3.1: **What does an 'ROC curve' and 'AUC' stand for?**
How does an ROC curve work, and what are the relevant formulas using TP and FP

[Answer] An ROC (Receiver Operating Characteristic) curve is a graph that evaluates the performance of a **binary classification model** by plotting the True Positive Rate (TPR) against the False Positive Rate (FPR) at various thresholds. The relevant formulas are:

- True Positive Rate (TPR):
$$\text{TPR} = \frac{\text{TP}}{\text{TP} + \text{FN}}$$
*aka **recall** or **sensitivity**: how many of all the **positives** did you 'catch'*

- False Positive Rate (FPR):
$$\text{FPR} = \frac{\text{FP}}{\text{FP} + \text{TN}}$$
*aka **1 - specificity**: how many of all the *

The curve helps to quantify the model's ability to discriminate between the positive and negative classes. A higher area under the ROC curve (AUC-ROC) indicates better model performance.

https://miro.medium.com/v2/resize:fit:1400/1*qW3Mobeew1xxnXJnBPy8LQ.jpeg
draw the bad model curve too 

###### Q3.2) **How could we use an ROC curve to decide between using a random forest vs a logistic regression**

###### Q3.3) **What type of model would theoretically produce the line on the ROC shown**

###### Q3.4) **What is the best threshold value to use** in this example

- make it like a flat line thing, how this model is objectively better than this one. 
- (sketch)

###### Q3.5) **What is the relationship between the true positive rate and the false negative rate?**

**Reminder:** 
<div style="text-align: center;"> 
  True positive rate = sensitivity<br>
  False negative rate = 1 - specificity
</div>

While sensitivity and 1-specificity are not **mathematically dependent** on each other in a direct equation, **they are often inversely related in practice**: improving one generally results in worsening the other, depending on the **threshold** chosen for classification.


<br>

---

###### Q3.2) **What point does the regression line always go through?** 

$$(\bar{x}, \bar{Y})$$
i.e the average of the **x values** and the average of the **y values**. 

Remember, a **statistic** is formally defined as **a function of the data**

###### Q3.3) **This is a plot of data along with its line of best fit. Draw i) confidence bands for the line itself and ii) confidence bands for new predictions.**

###### Q3.3) **What is homoscedasticity?**

Homoscedasticity is the property of different groups of data to have equal variance. 

---

###### QX) **What is a contingency table?**

**Simply:** It is just a table which shows counts for every combination of categories

**Technically:** Suppose you have multiple categorical variables (which may be continuous partitioned into classes)
- A **contingency table** records the number of observations for each possible cross-classification of these variables

<br>

###### QX) Is it the same as a confusion matrix?

**NO! Not at all**

<br>

---

###### QX) **How can we test whether two categorical variables are independent?**

**The Chi-Squared test of independence** (worked example in next question)
**Pearson Correlation Coefficient ($r$)**
**Spearman's Rank Correlation Coefficient**


<br>

---

###### QX) Case Study | Kanva
***Kanva** is a graphic design platform that offers three types of subscriptions: Free, Standard, and Premium. The company has collected data on its subscribers and wants to examine whether there's a relationship between a customer's occupation and the type of subscription they choose.*
this is too dense - do it in 5 lines. 
<br>

**Sample Data:**

| Occupation/Subscription | Free | Standard | Premium | Row Total |
|-------------------------|------|----------|---------|-----------|
| Student                 | 70   | 20       | 10      | 100       |
| Healthcare Worker       | 10   | 50       | 40      | 100       |
| Engineer                | 20   | 60       | 20      | 100       |
| Artist                  | 40   | 40       | 20      | 100       |
| Column Total            | 140  | 170      | 90      | 400       |


<br>

From this **contingency table**, we test the hypothesis of independence using the chi-squared test:

1. **Null Hypothesis ($H_0$)**: Occupation is independent of subscription type.
2. **Alternative Hypothesis ($H_A$)**: Occupation is not independent of subscription type.

**Expected Frequencies**
Now, we assume the **null hypothesis** is true. 
To calculate the expected frequency for each cell, we use the formula:

$$E_{ij} = \left(\frac{\text{Row i Total} \times \text{Column j Total}}{\text{Grand Total}}\right)$$
**NB** this comes from finding the probability $p_{ij} = \frac{\text{Row i Total}}{\text{Grand Total}} \cdot \frac{\text{Row j Total}}{\text{Grand Total}}$ and then simply multiplying by the Grand Total.

This is an important piece of logic: 
> ☞ If two categories are independent ($H_0$), then the probability of being in a particular cell should just be the product of the marginal probabilities for that category. **I.e** the probability of being a boy **an** only child is just the probability of each respective thing, multiplied together. This follows from the definition of independence: $Pr(A \cap B)=Pr(A) \cdot Pr(B)$

Following this formula, we can compute the expected frequencies for each cell in our contingency table:

| Occupation/Subscription | Free (Expected) | Standard (Expected) | Premium (Expected) |
|-------------------------|-----------------|---------------------|--------------------|
| Student                 | 35              | 42.5                | 22.5               |
| Healthcare Worker       | 35              | 42.5                | 22.5               |
| Engineer                | 35              | 42.5                | 22.5               |
| Artist                  | 35              | 42.5                | 22.5               |

With the observed and expected frequencies, we can compute the chi-squared statistic:

\[ \chi^2 = \sum \frac{(O_{ij} - E_{ij})^2}{E_{ij}} \]

For instance, for the observed and expected frequencies of students choosing the Free subscription:

\[ \chi^2_{contribution} = \frac{(70 - 35)^2}{35} = 35 \]

Repeating this for each cell and summing up the contributions gives the total chi-squared statistic.

4. **Determine the Degree of Freedom**:

\[ df = (\text{Number of Rows} - 1) \times (\text{Number of Columns} - 1) \]
\[ df = (4 - 1) \times (3 - 1) = 6 \]

5. **P-value**:

Using the chi-squared distribution and the computed chi-squared statistic, you can find the corresponding p-value.

6. **Conclusion**:

If the p-value is less than a significance level (e.g., 0.05), we reject the null hypothesis, suggesting that a customer's occupation and the type of subscription they choose are not independent. If the p-value is greater, we do not reject the null hypothesis, indicating no significant association based on our sample data.

Remember, this is a hypothetical example. In a real-world scenario, the results could vary, and additional considerations (like sample size, representativeness of the sample, and other external factors) might come into play.

<br>

###### Extra: Why is the degrees of freedom the way it is? What do degrees of freedom mean in general 

> ☞ **Concept of Degrees of Freedom**: The basic idea behind degrees of freedom is the number of independent pieces of information that go into estimating a parameter.

**Contingency Table**: In a contingency table, certain constraints are in place because the row and column totals must remain fixed. So, not every cell value can freely vary without affecting other cell values.

**Calculation for a Contingency Table**: For a table with `R` rows and `C` columns:

   - The number of independent values you need to know for a particular row to know all the cell values in that row is `(C - 1)`. Once you know the values for `C-1` columns, the value for the last column is determined by the row total.
   - Similarly, for a given column, you need to know the values for `(R - 1)` rows to determine the values for all the rows in that column.

Therefore, for a contingency table:
$$df = (R - 1)(C - 1)$$

This formula ensures we're only counting the true independent pieces of information within the table.

<br>

---

###### Linear regression means linear in the coefficients/parameters

1. **Simple Linear Regression**: 
   \[ y = \beta_0 + \beta_1 x \]

2. **Multiple Linear Regression**:
   \[ y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 \]

3. **Polynomial Regression**:
   \[ y = \beta_0 + \beta_1 x + \beta_2 x^2 \]

4. **Interaction Regression**:
   \[ y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1 x_2 \]

5. **Log-Linear Regression**:
   \[ \log(y) = \beta_0 + \beta_1 x \]

6. **Linear Regression with Sine Function**:
   \[ y = \beta_0 + \beta_1 \sin(x) \]

7. **Linear Regression with Cosine Function**:
   \[ y = \beta_0 + \beta_1 \cos(x) \]

8. **Exponential Regression**:
   \[ y = \beta_0 e^{\beta_1 x} \]

9. **Logarithmic Regression**:
   \[ y = \beta_0 + \beta_1 \log(x) \]

10. **Inverse Regression**:
   \[ y = \beta_0 + \frac{\beta_1}{x} \]




<br>

****

###### QX) What is the difference between a credible interval and a confidence interval? 
$$\theta$$
- **Credible Interval (CI)**:
    - Comes from the **Bayesian** statistics paradigm.
    - Incorporates prior knowledge or beliefs about a parameter in the form of a prior distribution.
- **Confidence Interval (CI)**:
    - Comes from the **frequentist** statistics paradigm.
    - Does not incorporate prior beliefs; it's based solely on observed data.


<br>

---

###### Are likelihood and probability the same thing? (better question)

<br>

---

###### what is a critcal region? (get this all together)


<br>

---

###### What is the likelihood function $L(\theta)$

> ☞ $L(·)$ is the likelihood function for **i.i.d** copies $X_1, \dots, X_n$ of $X$. It tells you the **likelihood** of the observed data as a function of a parameter $\theta$. 

*More symbolically, it tells you "how likely it is to see the data that you have seen", given a distribution.* 

**Uses:** 
- Maximum likelihood estimators (MLE)
- Likelihood ratios 
- Logistic regression


<br>

---

###### How much probabilities lies within one standard deviation from the mean on a normal curve with **mean=33.0 and variance=2.69**

**Same for all normal (Gaussian) distributions - no matter what the mean and variance is, since you can simply standardize.**

| \# $\sigma$ | Percentage of Data Within ± $\sigma$ |
|--------------------------------------------|------------------------------------------|
| 1                                         | 68.27%                                   |
| 2                                         | 95.45%                                   |
| 3                                         | 99.73%                                   |

---

SoftMax 

<br>

---
# `Probability`

---

---
s# `Probability and Statistics`


---

###### What is the Neyman-Pearson Lemma?

> ☞ The Neyman-Pearson Lemma provides a way to construct the most **powerful test** for testing a simple hypothesis against another simple hypothesis. In other words, it gives a test that has the highest probability of correctly rejecting the null hypothesis when the alternative is true, given a fixed probability of type I error.

<br>

---

# Distributions

**For basic statistical tests** (this is the bare minimum to know for Data Science - just known when to **apply** them)
draw all of em. Just say 
normal: means, paired means, difference in means when variance known
t-test: means of difference in means when variance unknown (most common situation), 
chi-squared: for variance
F-test: for comparison of two variance
and then the parameters for each. 
I state the pdf/pmf cos it's the most intuitive, and the CDF is just a reshuffling of the 

draw all: 
![[1200px-Chi-square_pdf.svg.png]]
**For more advanced analysis**
Poisson, 
Binomial, 
Normal
+ F and T 

**For super advanced analysis**
(the rest)

Let's get started.  
You can think of it like this: if a probability distribution's input is a whole number, it is discrete (e.g how many events occur in 3 mins), if its input is continuous wai tno

---



---

---




---


---

###### QX) **Poisson Hypothesis Test**

If a sample of fifteen observations on $X \sim \text{Poisson}(\lambda)$ yields $\sum x_i =14$, test the null hypothesis $H_0:\; \lambda=0.6$ against the two-sided alternative. Specify the p-value.

**Answer**

In R `2*(1-ppois(13, 15*0.6))`

<br>

---

###### QX.1) **The following two plots are used to the gauge the appropriateness of which two assumptions, from which model?**

![[Pasted image 20231015191706.png | center]]

**1. Residuals vs Fitted Values**: is a common visual aid to gauging **homoscedasticity** (equal variances for all observation along the line).
	The red line is a smooth approximation of the data, which simply aids in detecting anomalous trends in the residuals 

**2. QQ Plot**: is a general technique to test whether a set of **data** belongs to a particular **distribution**. 
	In this case, we are testing whether the **residuals** are **normally distributed**. 

###### QX.2) **Based on what you see, tell me about how appropriate you think each assumptions is**

1. Ideally, the residuals should be scattered randomly around the zero line

Rewrite:
	The first plot shows the residuals against fitted values. The red line is a smooth approxi-  
	mation of the data helping us detect anomalous trends in the residuals. Ideally, the residuals  
	should be scattered randomly around the zero line. The second plot is a QQ plot to check how  
	close the residuals follow a normal distribution. While the central part of the distribution looks  
	normal, a few of the extreme observations deviate a little from the normality assumption.  
	Overall the model looks reasonably appropriate for the data except for a few points that  
	might be incompatible with the model assumptions. The most extreme data points are num-  
	bered in the plots, for convenience. In this case, it is worth looking closely at observations 9,  
	25 and 51, to see if there is any reason to suspect they might be not representative of the other  
	states.
<br>

---

###### When is the mean of a distribution equal to its median? 

When the distribution is symmetric (easy to see visually )



<br>

---

# `ACT VIII`



E.g merge sort processes data into a sorted form. K-means clusters it. Approximate vs. Deterministic models
Know them INSIDE OUT. 

##### Advanced Python
`Source: Leetcode, Hackerrank`
I've thrown in a few for the sake of this book, but for more questions like these I would recommend going to Leetcode and **grinding**. 



(page) - OML!? 
One Million Leetcodes



---
## Big Data, Databases and SQL 

---

RECITE. DIkJSTRAS. 

###### QX) What is a database? 

A structured collection of data. 
Usually models a real world enterprise.

The database development lifecycle
![[Pasted image 20231021232752.png]]

**Example of the logical design for an Investment Banking enterprise's data**
![[Pasted image 20231021232854.png | 250]]


<br>

---

###### QX) What is a database management system (DBMS)? Which ones are you personally familiar with? 

> ☞ A **DBMS** facilitates the actual running and management of the database. It serves as an interface between an end-user and a database, allowing users to **create**, **read**, **update**, and delete data in the database.

1. **Relational Database Management System (RDBMS)**:
   - **Example**: MySQL, PostgreSQL (open source, extensible, SQL compliant), Oracle, Microsoft SQL Server
   - **Use Case**: Used for structured data with defined data types. Suitable for scenarios like customer relationship management systems, where data integrity and relationships are crucial.
   
2. **Database as a Service (DBaaS)**:
   - **Example**: Amazon RDS (which supports several database engines including MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server)
   - **Use Case**: Suitable for businesses that prefer cloud-based solutions and want to avoid the overhead of setting up, maintaining, and administering databases on their own. Amazon RDS, for instance, automates tasks like backups, patching, and scaling, making it easier to manage relational databases in the cloud.
   
3. **NoSQL Database Management System** (meaning anything other than SQL)
   - **Example**: MongoDB (document-oriented), Cassandra (columnar), Redis (key-value), Neo4j (graph-based), PostGIS (spatial)
   - **Use Case**: Suitable for unstructured or semi-structured data, or when scalability and speed are more crucial than consistency. MongoDB, for example, might be used for a product catalog with varying attributes for each product.
   
<br>

###### What are they key operations a DBMS must facilitate?

Read, write, insert, delete, update, backup, restore, permissions, index


<br>

---

###### Datatypes

---

###### MySQL, PostgreSQL, Oracle, and SQLite are all DBMS which support the `BIGINT` data type. What would be a realistic scenario requiring the use of `BIGINT`?

The range of regular `INT` is only `0-4294967295` (for unsigned integers, aka covering only positive values). 

Some examples of data which would exceed this limit are
- Post ID's 
- Population (more than 4.3 billion)
- Big analytics for media such as views (Gangnam Style)

---

###### QX) **What is the difference between data and information?**

   - **Data**: Raw facts and figures, stored and recorded. It can be numbers, characters, symbols, or even a set of unprocessed observations.
   - **Information**: Information is data that has been processed in a meaningful way, which increases the reader's knowledge. It's the result of analyzing data and giving it **context**, making it useful for decision-making or understanding.

   > ☞ In essence, data becomes information when it is put into a context and starts having a purpose or relevance.

---

###### QX) **Is SQL a DBMS?**

   - No, SQL (Structured Query Language) is not a DBMS. SQL is a standardized programming language used for managing and querying data in a relational database. A DBMS, on the other hand, is software that manages databases. SQL is used as the primary language to interact with many DBMSs, like MySQL, PostgreSQL, and SQL Server.

<br>

---


###### Why databases? Why don't we just use file processing systems? 

   - **Data Integrity**: Databases enforce data integrity constraints (like unique constraints or referential integrity) ensuring the accuracy and reliability of data.
   - **Data Redundancy**: Databases centralize data storage, reducing data duplication and redundancy, which is common in file processing systems.
   - **Concurrency**: Databases allow multiple users to access and modify data simultaneously without data conflicts.
   - **Security**: Databases offer robust security mechanisms, including access controls, encryption, and user authentication.
   - **Scalability**: Databases are designed to handle large volumes of data and can be scaled up or out as required.
   - **Data Independence**: Changes in the database structure (like adding new fields) don't affect the applications using it, which isn't the case with file-based systems.
   - **Backup and Recovery**: Modern DBMSs come with tools and utilities for data backup, restoration, and disaster recovery.
   - **Complex Queries**: With SQL and other querying mechanisms, databases can perform complex queries, aggregations, and data manipulations efficiently.

<br>

---

**Inconsistent retrieval problem**

Occurs when a transaction calculates some aggregate functions over a set of data, while other transactions are updating the data. 
	Some data may be read after they are changed and some before they are changed, yielding inconsistent results 


The object relational impedance mismatch problem is...

NoSQL allows data to be stored in a much more flexible data format, which may accomodate and be more consistent with the way the actual data is used in applications - which can be very complex and abstract - nested, unstructured. Objects from the application code can be stored and retrieved from the database without the need for complex mappings and transformations.  thus reducing the impedance mismatch by simplifying the interactionbetween the application code and the database.


<br> 

---

> ![[Pasted image 20231103234244.png]]

> Object–relational impedance mismatch **creates difficulties going from data in relational data stores (relational database management system [“RDBMS”]) to usage in domain-driven object models**.

---
###### Q: **What is 'on the fly' selection in query processing and how does it affect the cost of a given query access path?**
`Source: ` #database #query #sql #🐫

###### Q: **Explain the differences in how a B+ Tree Index vs. a Hash Index could be used to search the query `Age < 20 AND userid=5 AND sid=3`

- For binary search tree, 





# Spark, Hadoop, SQL

# SQL

- My cheat sheet has some good principles 

---

| **Representation**     | **Brief Explanation** (read carefully)                                                                                                                                                                        |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Relational Data Model  | Based on the concept of tables (relations) consisting of rows (tuples) and columns (attributes). Data is structured into tables, and relationships are established through foreign keys.          |
| ER (Entity-Relationship)| A conceptual representation of data using entities, their attributes, and the relationships among entities. Commonly visualized using ER diagrams before translating to a relational schema.    |
| O-O (Object-Oriented)   | Represents real-world objects and their relationships. Objects encapsulate both data (attributes) and methods (functions). Classes define objects, and inheritance can establish relationships.    |
| Network                | Data is represented as nodes and sets. Nodes are the records and sets define one-to-many relationships. It allows for more complex relationships compared to the hierarchical model.               |
| Hierarchical           | Represents data in a tree-like structure. Each record has one parent and can have multiple children, but no record can have multiple parents. It's less flexible than the network model.          |

These are the primary ways real-world objects are represented in computer systems. There are other data models and representations, such as the **Document Model** (used in NoSQL databases like MongoDB, where data is represented in a document format, often JSON) and the **Graph Model** (where data is represented as nodes and edges, focusing on the relationships and connections between entities).


<br>

---

##### SQL Practice
`Leetcode`

##### Extended SQL Question | Fruit Shop
`Source: Justin Lee` #sql #🍇
**𝗤:**

Suppose we have two tables, `Orders` and `Customers`.

**Orders Table**

| OrderID | ProductName | Quantity | Price | CustomerID |
| ------- | ----------- | -------- | ----- | ---------- |
| 1       | Apple       | 3        | 5    | 1          |
| 2       | Banana      | 6        | 2    | 2          |
| 3       | Cherry      | 15       | 3    | 1          |
| 4       | Apple       | 1        | 5    | 3          |
| 5       | Banana      | 1        | 2    | 3          |

**Customers Table**

| CustomerID | Name      | Email                |
| ---------- | --------- | -------------------- |
| 1          | Alice     | alice@email.com      |
| 2          | Bob       | bob@email.com        |
| 3          | Carol     | carol@email.com      |



i) Write a SQL query to fetch the list of unique product names.
ii) Write a SQL query to fetch the orders made by Carol.
iii) Write a SQL query to find the total expenditure of each customer.
iv) Write a SQL query to rank customers based on their total expenditures, from highest to lowest. 
v) Write a SQL query to calculate the running total of expenditures for each customer, ordered by CustomerID.
vi) Assume we want to give a discount of 10% to customers whose total expenditure is above $30. Write a SQL query to list the names of customers who are eligible for the discount, along with their discounted total expenditure.

---

**𝗔:**

**Part 1: Basic Query - List of Products**

```sql
SELECT DISTINCT ProductName
FROM Orders;
```

**Part 2: Join Operations - Customer Orders**

```sql
SELECT o.OrderID, o.ProductName, o.Quantity, o.Price
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
WHERE c.Name = 'Carol';
```

**Part 3: Aggregation - Total Expenditure**

```sql
SELECT CustomerID, SUM(Quantity * Price) AS TotalExpenditure
FROM Orders
GROUP BY CustomerID;
```

**Ranking - Most Valuable Customers**

```sql
SELECT CustomerID, SUM(Quantity * Price) AS TotalExpenditure,
       RANK() OVER (ORDER BY SUM(Quantity * Price) DESC) AS CustomerRank
FROM Orders
GROUP BY CustomerID;
```

**Part 5: Window Functions - Running Total**

```sql
SELECT CustomerID, 
       SUM(Quantity * Price) OVER (ORDER BY CustomerID) AS RunningTotal
FROM Orders;
```

**Complex Query - Discounts**

```sql
WITH CustomerExpenditure AS (
  SELECT CustomerID, SUM(Quantity * Price) AS TotalExpenditure
  FROM Orders
  GROUP BY CustomerID
)
SELECT c.Name, ce.TotalExpenditure * 0.9 AS DiscountedTotal
FROM CustomerExpenditure ce
JOIN Customers c ON ce.CustomerID = c.CustomerID
WHERE ce.TotalExpenditure > 30;
```

---

##### Q: **What is the difference between `INNER JOIN` and `LEFT JOIN`?**
`Source: Common Interview Question` #join #database #🤔

An `INNER JOIN` returns records that have matching values in both tables involved in the join. A `LEFT JOIN` returns all records from the left table, and the matching records from the right table. If there's no match, NULL values are returned for columns of the right table.



---

##### Q: **What are aggregate functions and can you name a few?**
`Source: Common Interview Question` #aggregation #SQL #📊

Aggregate functions perform a calculation on a set of values and return a single value. Examples include `SUM`, `AVG`, `MIN`, `MAX`, and `COUNT`.



---

##### Q: **What is the purpose of the `GROUP BY` clause?**
`Source: Common Interview Question` #grouping #SQL #👥

The `GROUP BY` clause is used to arrange identical data into groups. It's often used with aggregate functions to perform calculations on each group of data.



---

##### Q: **Explain `HAVING` vs `WHERE` clause.**
`Source: Common Interview Question` #SQL #filtering #🔍

Both `HAVING` and `WHERE` are used to filter rows, but `HAVING` is used to filter aggregated data. `WHERE` filters rows before aggregation, and `HAVING` filters them after.



---

##### Q1: **What is a subquery and what are its types?**
`Source: Advanced SQL Topic` #subquery #SQL #🤓

A subquery is a query nested inside another SQL query. It can be independent (doesn't rely on the outer query) or correlated (references columns from the outer query). Subqueries can be used in `SELECT`, `FROM`, and `WHERE` clauses.



---

##### Q2: **What is indexing and why is it important?**
`Source: Database Optimization` #indexing #performance #⚡

Indexing improves the speed of data retrieval operations. It provides a database engine with a quicker way to look up rows in a table, thus making queries more efficient. An index consists of 



---

##### Q3: **What is normalization and why do we need it?**
`Source: Database Design` #normalization #database #📑

Normalization is the process of organizing the database to reduce redundancy and dependency by organizing data into separate tables. It improves data integrity and makes the database more efficient.

<br>

---
###### Q5) **In the context of databases, what is a memory buffer?**

A memory buffer in databases is a temporary storage area in RAM that holds data being transferred between different locations. It serves to improve efficiency in read and write operations by reducing the need for slower disk I/O. The buffer can store frequently accessed data for quicker retrieval and can accumulate multiple small operations into larger, more efficient ones before writing to or reading from disk.

---

###### Q6) **What is the unit of optimization in query optimsiation**

A block - any state

---

###### What is the difference between `GROUP BY` and `PARTITION BY`

- `PARTITION BY` is for organizing data within a window function without reducing the number of rows in the result set.
- `GROUP BY` is for aggregating data into fewer rows, summarizing it based on certain criteria.

This is best illustrated by the functions that are used in conjuction with these clauses
- With `GROUP BY` you could use an **aggregate** function like `SUM()`, which reduces the result to 1 row. 
	- With `PARTITION BY` you could use a function like `ROW_NUMBER()` which creates 

<br>


---

###### Q7) **What is the reduction factor (aka selectivity) for a given predicate**

---

###### QX) **Something which tests understand of disk vs. RAM, memory etc...** 

###### QX) **What is a buffer page** 

---

###### QX) **What is CAP theorem** 

> ☞ A fundamental theoretical principle in database design is the CAP Theorem, which dictates that a database can only be **2 out of 3** of the following: fully consistent, available, and partition tolerant all at the same time.

In other words, **choose two**: Your database will:
1. Show the same data at the same time in all parts of the system (essential for banking)
2. Always be responsive and return data, even if it's not the latest info (useful for social media)
3. Keep running even when communication between parts of it are offline (essential for global services)


**Choose two!** (3/3 is theoretically possible but would be impractically expensive)

<br>

----

###### QX) Can you name an example where partition tolerance and consistency are more important than availability? 

**Online Banking during Natural Disasters**
If a bank operates in an area hit by a hurricane, communication might be disrupted. In this scenario, the system might temporarily deny transactions in the affected area to ensure data integrity, while the rest remains functional.

<br>

---


![[Pasted image 20231010225558.png]]

 


---

Testing of basic data storage methods... Redundant array of desk shit... Soft Dev 3/4 textbook

![[Pasted image 20231010224951.png]]

---


###### Q8) **SQL vs. NoSQL database. Traditional database design / big data schema model. Data lake**

no schema 

(move to somewhere else)

embedding -> transformer -> gpt - it's simple logic

<br>

---

###### Q7) **What are the three V's that characterise 'Big Data'**

1. **Volume**: giant amounts of data
2. **Velocity**: being generated and received at super fast rate, e.g mobile, sensors, web click stream
3. **Variety**: of many different types, unstructured and structured, common or exotic

**Extras**:  
- **Veracity**: quality and accuracy 
- **Value**: this data is essentially '***crude oil***' - it has so much power to businesses, i.e decision making, prediction, analysis, generation.

<br>


# Miscellaneous

### Game Theory 
What is a zero sum game 

# `R`
R is simple. Data <- read.csv('all_data') - omg. zetamac



# Gradient Descent 
- everything tom said... 
- regularisation
- hill climb, beam search, simulated annealing
- Numerical techniques to find MLE’s

So, "2.2e-16" means:

2.2×10−162.2×10−16