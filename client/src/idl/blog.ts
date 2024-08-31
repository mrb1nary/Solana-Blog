/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/blog.json`.
 */
export type Blog = {
  "address": "4NUErqfetf6cFHFt4jS7Hg1WZLk1cmUrUJKSdKCifZfj",
  "metadata": {
    "name": "blog",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createBlog",
      "discriminator": [
        221,
        118,
        241,
        5,
        53,
        181,
        90,
        253
      ],
      "accounts": [
        {
          "name": "blogPost",
          "writable": true,
          "signer": true
        },
        {
          "name": "index",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "body",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateIndex",
      "discriminator": [
        102,
        132,
        25,
        95,
        6,
        162,
        53,
        33
      ],
      "accounts": [
        {
          "name": "index",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "blogPostPda",
          "type": "pubkey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "blogAccount",
      "discriminator": [
        175,
        29,
        42,
        253,
        243,
        77,
        150,
        155
      ]
    },
    {
      "name": "index",
      "discriminator": [
        140,
        66,
        194,
        132,
        78,
        26,
        135,
        186
      ]
    }
  ],
  "types": [
    {
      "name": "blogAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "body",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "index",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pdas",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    }
  ]
};
