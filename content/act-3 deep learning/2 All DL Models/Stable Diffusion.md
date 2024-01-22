How AI image generators work. 
the code, the papers, work out what's going on 
https://youtu.be/1CIpzeNxIhU?si=ywNiL6hBUVJte_qY

Types of noise

Let's build up a modular understanding of stable diffusion. You need to all these dependencies: 
Now you know UNETs, CLIP, VAR, 

watch x2 stable diffusion videos (and mine)

---

##### Questions

- Generative adversarial networks are the standard way of generating networks
	- Noise -> black box big Neural Net 
	- Trained in corpus of faces 
- Training by
	- give it noise
	- it produces an image
	- tell it if it's good or bad
		- using another network which tries to detect real or fake images 
	- both networks get better 
	- This kind of works 
		- The problem: hard to train
			- mode collapse (produces same face to fool it every time)
			- if you're not careful w/ training process
			- hard to go from noise to good image

- Diffusion models 
	- break down into **iterative** small step process
	- Process
		- Start w/ image
		- Add some noise
		- Add some more noise 
		- Add some more more noise
		- Until you just end up with noise 
	- Instead of trying to do everything in one go
		- Slightly easier to reverse and remove a little bit of noise 
		- Difficult because you don't know what the original image was
		- Train network to undo the process of iteratively adding noise 

- How much noise to add
	- Add small amount of noise and then same amount again, until we have random noise 
		- Linear schedule
	- Add very little noise at the beginning then ramp it up
	- Called the 'schedule'
	- `t=0, t=1, t=2, ..., t=T`
	- Gaussian's add together very nicely - can just go straight to `step 7`
	- can feed model different images and different steps of noise
- Take noisy image at e.g `t=5`
	- Giant u-shaped encoder decoder networks, and time
	- Network needs to know what step you're at
- Mathematically works out easier if you just try to predict the **noise** 
	- Then take that away from the original rabbit at `t=5` and get just the rabbit back. 
- E.g 'give me the noise that takes me back to `t=4`'
	- Problem: stuck with the time steps 
	- Solution: whatever time step you're at, predict all the noise that I can take back and get the original image 
- Pick random image and random time step
	- Noise image at time step `t`
	- Put into network
		- it returns the noise that we just added to that image
		- So we have a network that produces estimate for what that noise is
	- Then take the noise away. 
- Want to take it more slowly. 
	- Take the noise away from the feed-in image 
	- Then we get a slightly less noisey image, an estimate for `t=0`
	- Then we add back like 90% of the noise
	- And feed it back in. 
![[Pasted image 20231209103326.png]]

At each step, you have an estimate of what the original image was, $t_0$
- Predict noise and then take it away. 

- Much more stable than a GAN

--- 

### How do we direct/guide this

- We **condition** this network by giving it access to the text as well
- Start w/ Random Noise (gaussian)
	- 0-1 not 0-255
- `t-50 `is most noised image, and then + the prompt - and embed this and stick it in. 
	- Produces the noise estimate... 
	- When you subtract the noise you get your first estimate for `t=0`
	- Then you add noise back to get `t=49`
	- Repeat 
- **Final trick:** 
	- if you do this it'll be okay but... 
	- They do classifier free guidance - once you include the text embeddings, and once you don't. 
	- calculate difference between these two and amplify that signal - want to target the prompt


Would have been nice hear a bit more about the "gpt-style transformer embedding". Wouldn't those classifications have to be included in the training data already?

This is basically what CLIP does. CLIP learns from a massive amount of image-description pairs using GPT-style (Transformers) encoding so that it can map texts and images. CLIP data are not classification labels. Then the difference between the texts and the generated images can be calculated and minimized.

Key word is embeddings. Initial feature space of text has two bad properties: it has big dimensionality (each token is it's own dimension essentially) and sparsity. By using Transformers you compress representation of this object in more compact and dense form, so it's easier to work with.

Stable diffusion doesn't actually actually apply noise to images, it uses a compressed low dimensional latent representation of the image and applies noise to that. The model is running in this abstract latent space, and then the autoencoder recreates the image afterwards.


https://youtu.be/24yjRbBah3w?si=LQiMJZV0bDcImObp