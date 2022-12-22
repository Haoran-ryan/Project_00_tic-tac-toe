# Project 1 : Tic Tac Toe

## Logs
#### 19-Dec-2022
1. basic structure working 
2. basic winning rules working

#### 20-Dec-2022
1. all the rules working
2. restart button working
<u>**21-Dec-2022**</u>
1. adding a strike to make the winning result more visible


## Development Ideas 
#### 19-Dec-2022
1. pre-set a winning combo by assigning an 'index-like' number to 9 cells
2. use grid to arrange the 9 cells in 3x3 layout 
3. record the 'index' of each taken spot by each player and compare the spots with the winning combo 
```javascript

fucntion checkForWinner(arguments):
input winningCombinations - an array of arrays; takenSpots - an array recording the positions taken by each player;
output true - there is a winner; false - there is no winner

for each array in the winningCombinations then do:
    if 
        the value in the array is all taken in the playerSpot array;
        && taken by the same value (same player)

        return true;
    end if 
    
end for loop;


```
## Bugs 
#### 19-Dec-2022
1. restart button not working - FIXED
2. some rules are not working because of the way array was pushed and compared -FIXED
#### 21-Dec-2022
1. the auto restart after a game ends invokes an infinite loop of the restartGame function. 
---
### Copyright (c)
Author: Ryan Haoran Guo 