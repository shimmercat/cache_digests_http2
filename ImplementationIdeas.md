
# Introduction


We want to create a functional cache digests implementation purely in Javascript.

By functional we mean that it should be usable by, for example, a  NodeJS server script
or a service worker in the browser.

The implementation should support three use scenarios:

1. Creating the cache digest.

2. Testing if an asset is in the digest.

3. Explaining how a cache digest is built.

To satisfy the third scenario, the process of creating the cache digest should
be done in parts, like this:

```
    INITIAL_DATA -- process 1 --> Result_Of_Process_1
    Result_Of_Process_1 -- process 2 --> Result_Of_Process_2
    ....
    Result_Of_Process_n -- final_process --> Final_Cache_Digest
```

The intention is that each intermediate result should be easy to visualize.


#Ideas

## 1. Using IndexedDB: cache storing because Cache API is not supported in every browser


# Milestones


## 1: Compute a hash value

This is to take a URL or (URL, Etag) tuple and compute a hash value.
The process is described at [section 2.1.2](https://mnot.github.io/I-D/h2-cache-digest/#hash) of the draft.

## 2: Compute a digest

This is the process where several hash values (as computed on the previous section) are combined to produce a digest.
The process is fully described at [section 2.1.1](https://mnot.github.io/I-D/h2-cache-digest/#computing) of the draft.

## 3: Check if a hash value is in cache digest

See [section 2.2.1](https://mnot.github.io/I-D/Published/h2-cache-digest/#rfc.section.2.2.1) of the draft.

>>>>>>> origin/master
