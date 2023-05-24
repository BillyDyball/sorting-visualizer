export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return [animations, array];
}

function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

//Worst Case: O(n*n)
//Best Case: O(n)
export const getBubbleSortAnimations = array => {

    let animations = [];
    let passWithoutChange = true;
    let numberOfPasses = 0;

    while(passWithoutChange){

        //if an entire loop is done over the array and no change is made this will 
        //break the while loop since the array is already sorted
        passWithoutChange = false;

        for(let i = 0; i < array.length-1-numberOfPasses; i++){

            //two values are being compared so I add this to the animations array
            animations.push([i, i+1, 'compare']);

            //Swap values if left value is more than right value
            if(array[i] > array[i+1]){
                passWithoutChange = true;

                //Swaping values
                let temp = array[i];
                array[i] = array[i+1];
                array[i+1] = temp;

                animations.push([i, i+1, 'swap']);
            }
            
            animations.push([i, i+1, 'stopComparing']);
        }

        animations.push([array.length-1-numberOfPasses, "sorted"])
        numberOfPasses++;
    }

    //unnecessary for algorithm but to make animations look nice I added this in
    for(let i = array.length-1-numberOfPasses; i >= 0; i--){
        animations.push([i, "sorted"]);
    }
    for(let i = 0; i < array.length; i++){
        animations.push([i, "finish"]);
    }

    //Now sorted array
    return [animations, array];
}

//TODO
export const getInsertionSortAnimations = array => {

    let animations = [];

    for(let i = 1; i < array.length; i++){

        let key = array[i];

        let j = i-1;
        animations.push([i, j+1, "compare"]);

        while(j >= 0 && key < array[j]){

            animations.push([j+1, j, "swap"]);
            array[j+1] = array[j];
            j -= 1;

        }

        animations.push([i, j+1, "doneSwapping"]);
        array[j+1] = key;
    }

    return [animations, array];
}

export const getQuickSortAnimations = array => {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    animations.push("done");
    return [animations, array];
}
 
function quickSortHelper (array, low, high, animations) {
    //breaks when array can no longer divde its self and thus should be sorted
    if(low < high){
        //find and move all elements that have a higher value then the pivots value
        let pi = partition(array, low, high, animations);

        //divide the array into a low and upper half
        quickSortHelper(array, low, pi - 1, animations);
        quickSortHelper(array, pi + 1, high, animations);
    }
}

function partition(array, low, high, animations){

    //set the pivot in this case the pivot is always the right most element
    let pivot = array[high];
    animations.push([high, 0, "pivot"])

    let i = low - 1; //index of smaller element

    for(let j = low; j <= high - 1; j++){
        //if current element is smaller than the pivot
        if(array[j] < pivot){
            i++; //move smaller element up by one

            //swap array[i] with array[j]
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            //helps to speed up animations
            if(i !== j){
                animations.push([i, j, "swap"]);
            }
        }
    }

    //swap array[i+1] and array[high]
    let temp = array[i+1];
    array[i+1] = array[high];
    array[high] = temp;
    //helps to speed up animations
    if(i+1 !== high){
        animations.push([i+1, high, "swap"]);
    }

    animations.push([high, 0, "endPivot"])

    return i+1;
}