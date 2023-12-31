

##### Was is the difference between a stack and priority queue?

##### What is a monotonic stack? 






##### Leetcode 84 

The key insight for this algorithm is that a stack allows us to efficiently track which bars have potential rectangles that are "open" for expansion to the right, and we only close them off (calculate their area) when we encounter a bar that's too short to be part of that rectangle. The stack ensures that we only consider each bar once when calculating areas, which gives us the O(n)O(n) time complexity.