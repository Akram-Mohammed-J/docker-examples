n = int(input("Enter a postive number"))

if n < 0:
    print("Enter positive number")
else:
    sum = 0
    i = n
while i > 0:
    sum+= i
    i -= 1
print("Sum of all numbers till", n, "is", sum)    

