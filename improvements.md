- currently, given the same key and the same text in the same position will be encrypted to the same value
  - example: two messages starting with "hello" will encrypt "hello" to the same values.
  - to account for this, the starting position in the key can be changed based on the checksum of the message
    - Advantages: different messages will now encrypt to different values when the messages are different
    - Disadvantages: messages containing the exact same text will still encrypt the same; I don't know how I'll relay the starting position for decryption
    - IDEA: last 8 bits of checksum mod key.length = new starting position
    - IDEA2: "shuffle" the message with every loop. the ending char will be placed at the front
- looping the encryption will strengthen the algorithm
- changing the position in the key each encryption loop will greatly strengthen the crypt

# NEW NEW NEW

INSTEAD OF APPENDING CHECKSUM, CHOOSE RANDOM NUMBER
