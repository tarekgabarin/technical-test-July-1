## Questions

### How long did you spend on the coding assignment? What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I spent around 6 hours throughout the day on it. If I had more time to spend on it, I would definitely find a nice color theme to stylize it more. In addition, I would add more filters to the search form, maybe let the user search restaurants by their price tier. I also would have added a google map showing the locations of restaurants in a given city. 

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

I love hooks in React. One amazing aspect of Hooks is that you can easily build your own custom hooks to suit your needs. Here is an example of a hook I use in all my projects for handling responsiveness: 

```export function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
```

### What were the more challenging parts of this assignment for you?

One aspect I did find challenging was coming up with the design impromptu without a UX design beforehand, especially within such a short time frame.  

### How would you track down a performance issue in production? Have you ever had to do this?

I have used lighthouse before to test the performance of web applications.

### How would you improve the API that you just used?

I think it would be wonderful if there was a way to search for restaurants based on the type of cuisine they serve. 

### Please describe yourself using JSON.

```{
  "name": "Tarek Gabarin",
  "birthday": "1992-10-26",
  "skills": ["python", "javascript", "so much more"],
  "education": {
    "university": {
      "name": "UofT",
      "period": [2013, 2017],
      "degree": ["bachelor"]
    }
  },
  "favouriteIceCream": “chocolate”
}
```