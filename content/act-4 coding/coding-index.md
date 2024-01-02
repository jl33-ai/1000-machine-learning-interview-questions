This section covers algorithms, data structures, and development

We are in the realm of Artificial Intelligence. It's important to understand that 'artificial intelligence' can be achieved through neural networks as well as deterministic algorithms. 

You should know beam search, and the A* algorithm. 
And you know be interested enough in computer science to care. 

How do Minecrafts mobs track you?

heuristic 

https://news.ycombinator.com/item?id=38833658

![[a-star-depth.gif]]

---

##### In this section you will learn to: 

> [!check] Invert a Binary Tree

> [!check] Reverse a Linked List

> [!check] Recite Binary Search

> [!check] Solve the Knapsack problem with Dynamic programming





some leetcodes along with the key to solving them. 

Tips and tricks
- comment the time complexity 
- justify each line
- 


Beyond cracking the question algorthimicall, some other things you can do 
- Handle edge cases well 
- Talk through your approach fluently 
- Ask clarifying questions 

**One sentence answers**. short n sweet. get the gist. because n since

**How quickly can you mentally solve these Leetcodes? (Figure out the best algorithmic approach)**
do you understnad the logic behind them. 

---

###### Q1) **Longest Common Prefix**

```
Write a function to find the longest common prefix string amongst an array of strings.

EG
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

**Solution**: Sort the array of strings and compare the first and last words from the start; a mismatch between them implies the end of the common prefix - due to lexicographical sorting. 

**Time complexity**

`Total: O(m•n•log(n))`
- **Where** $n$ is the number of words in the list 
- **Where** $n \cdot log(n)$ is the cost of sorting $n$ words
- **Because** $m$ is the maximum number of letters to iterate through (out of the first or last word)

---

###### Q2) **Water Container**

---

###### Q4) **2-Sum**

---

###### Q5) **3-Sum**
```
Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must not contain duplicate triplets.

EG
Input:         nums = [-1,0,1,2,-1,-4]
Output:               [[-1,-1,2],[-1,0,1]]
```

- **Hint 1)** You have to get it down from $O(n^3)$ to $O(n^2)$ 
- **Hint 2)** Exploit the fact that every index $i, j, k$ must be unique 
- **Hint 3)** Sort the list
- **The Idea)** 

[Example Answer](https://leetcode.com/problems/3sum/solutions/4155263/video-visualization-of-o-n-2-solution-two-pointers/)

(picture of the way the indexing works)

---
###### Q6) **Topo-sort** 

**Tell me about the topological sorting algorithm. What is it useful for? Walk me through the basic pseudocode.**

<br>

---
###### Q7) Travelling Salesman




###### Q8) Palindrome

Problem: `How to find the longest palindrome`
Solution: 



###### Letter Combinations of a Phone Number

I included this one because it's deceptively hard. Seems so trivial but actually tricky to implement in any language (well, for me)

(diagramo of keypad)

**Solution:** There's no clever 'trick', but if you understand the recursive function that's just as impressive. 

- Base cases: 
	- You've gotten a string long enough to 
	- You've reached the end of the 'digits'
- Recursive case: 
	- 
(stack diagram)


```python
def letterCombinations(self, digits: str) -> List[str]:

	if digits=="":
		return []
	d = ["", "","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"]
	n = len(digits)
	output = []
	def addto(i, s):
		if len(s) == n:
			output.append("".join(s))
			return
		if i == n:
			return
		for j in d[int(digits[i])]:
			s.append(j)
			addto(i+1, s)
			s.pop()
		return
	addto(0, [])
	return output
```

###### 

Eventually you just start quizzing yourself at random points in the day, for ufn. 


Basic function notation so easy
simple implenentation



I've gone through and created NeetCodeML, basically NeetCode but with Pandas and SQL, and some custom SKLearn questions. 
Each question has an optimal solution in Python and C++ and time complexity. 



Recreate:




Hospools, all from DOA (the schedulign one)

every intresting algorithm you should know - for quant, ML... 

follows neetcode. 