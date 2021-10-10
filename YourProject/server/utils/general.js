/* merge two objects
this will merge the 1st and second object, replacing any conflicting fields with the 2nd objs value
objeMerge(obj1, obj2)
this will merge the objects and add any conflicting number fields
objeMerge(obj1, obj2, { add: true})
*/
const objMerge = async (obj1, obj2, options) => {
    // Await any promise params
    obj1 = await obj1;
    obj2 = await obj2;
    // Merge objs
    for (key in obj2) {
        if (obj1[ key ]) {
            typeof obj1[ key ] == 'number' && (options && options.add) ? obj1[ key ] += obj2[ key ]
                : typeof obj1[ key ] == 'object' ? obj1[ key ] = await objMerge(obj1[ key ], obj2[ key ])
                    : obj1[ key ] = obj2[ key ]
        }
        else { obj1[ key ] = obj2[ key ] }
    }
    return obj1
}
/* merge two arrays and merge any matching objects based on input field
    objArrMerge('field', obj1, obj2)
    objArrMerge('field', obj1, obj2, { add: true })
*/
const objArrMerge = async (id, arr1, arr2, options) => {
    let promises = []
    for (idx in arr2) {
        let match = arr1.find(obj => obj[ id ] == arr2[ idx ][ id ])
        if (match) {
            promises.push(objMerge(match, arr2[ idx ], options))
        }
    }
    return Promise.all(promises).then(res => { return res })
}
// acts like Promise.all() but works with objects containing promises
const awaitObj = async (obj) => {
    obj = await Promise.resolve(obj)
    for (key in obj) {
        obj[ key ] = await Promise.resolve(obj[ key ])
    }
    return obj
}
// replace a field in an object
const replacePropName = (obj, prop, nwProp) => {
    if (obj[ prop ]) {
        obj[ nwProp ] = obj[ prop ]
        delete obj[ prop ]
    }
    return obj
}
// check if any property in an object has a cyclic reference and report its location/cause
// (not my code its from stack overflow)
const isCyclic = (obj) => {
    var seenObjects = [];
    function detect(obj) {
        if (obj && typeof obj === 'object') {
            if (seenObjects.indexOf(obj) !== -1) {
                return true;
            }
            seenObjects.push(obj);
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[ key ])) {
                    console.log(obj, 'cycle at ' + key);
                    return true;
                }
            }
        }
        return false;
    }
    return detect(obj);
}


// show current memoryUsage (nodejs has a max of 2GB before it crashes)
// (not my code its from stack overflow)
const logMemory = () => {
    const used = process.memoryUsage();
    for (let key in used) {
        console.log(`Memory: ${key} ${Math.round(used[ key ] / 1024 / 1024 * 100) / 100} MB`);
    }
}


// performance logger that returns a string shows how many ms has passed since last called
// console.log(perflog())
let perfLog = (message) => {
    if (url.port == devport) {
        pref = 0;
        perfTest = performance.now();
        return `${Math.round(performance.now() - pref)}ms`
    } else {
        return ''
    }
}

// exports.objMerge = objMerge
// exports.objArrMerge = objArrMerge
// exports.awaitObj = awaitObj
// exports.replacePropName = replacePropName
// exports.isCyclic = isCyclic
// exports.logMemory = logMemory
// exports.perfLog = perfLog

module.exports = { objMerge, objArrMerge, awaitObj, replacePropName, isCyclic, logMemory, perfLog };

