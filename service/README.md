Codypaste Service

Usage:

```
docker-compose up --build
```

Codypaste service responsible for: 
  1. User authorization
    * possibility to create codypaste account / log in using 3rd parties (e.g GitHub)
    * possibility to store private snippets (available only for authorized users)
  2. Notebooks
    * each notebook contains several pages
    * each user can have multiple notebooks (notebook has single owner)
    * notebook can have expiration date
    * notebook can be either private (for authorized users) or public (for non auth users or enabled for private)
    * should contain short and user friendy public id
    * could be possible to share notebook with some specific users (using their username)
  2. Snippets
    * Contains snippet content (code, text, etc.)
    * Are fully encrypted (key stored outside backend)
    * Are created for single notebook