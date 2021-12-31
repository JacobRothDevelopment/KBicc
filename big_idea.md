### KBicc (Key Based Instruction Caesar Cipher)

# What's The Big Idea, huh?

```
key is a string of chars

convert string to hex

input: message
current cipher = message
loop at least 27 times {
	for each value in hex key {
		perform an operation base on that key value based on the mapping

	}
	for i = 0; i < message.length {
		char = message[i]
		op = mapping[i mod 16]
		current cipher[i] = op(char)
	}
}

the mapping = [
	0 - 9	=> iterate char ascii by n and mod 256
	A		=> xor n by 91	/01011011 and mod 256
	B		=> xor n by 102	/01100110 and mod 256
	C		=> xor n by 78	/01001110 and mod 256
	D		=> xor n by 130	/10000010 and mod 256
	E		=> xor n by 31	/00011111 and mod 256
	F		=> xor n by 176	/10110000 and mod 256
]

```

# Basic Goals:

1. Each character in the key determines the next action to perform

2. The encryption is symmetric, meaning the same key is used for encrypting and decrypting

3. Must be fast. Run time is near negligible in javascript.

# Featured Goals:

1. When a message changes even one character, each encoded character has a very high likelihood of changing

2. When a key changes even one character, each encoded character has a very high likelihood of changing

3. Each input character has equal chance to map to any 8 bits as an output, uniformly distributed

4. The encrypted message is no bigger than 109% of the original message (in bytes) on average. I need to consider that sending this information needs to be fast as well.

5. The same message and key can produce different encryptions

# Operations Options

1. Iterate binary some number

2. XOR 8bit char with some other 8 bits

3. Skip operation (iterate + 0, basically)

4. Add salt. Insert a character before
