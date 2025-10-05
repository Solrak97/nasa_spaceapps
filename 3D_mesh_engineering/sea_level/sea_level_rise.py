import csv

# Input and output files
input_file = "GMSL_TPJAOS_5.2.txt"  # replace with your file
output_file = "sea_level.csv"

# Define column names based on your description
columns = [
    "Altimeter_Type",           # HDR 1
    "Cycle",                    # HDR 2
    "Year_Fraction",            # HDR 3
    "Num_Observations",         # HDR 4
    "Num_Weighted_Obs",         # HDR 5
    "GMSL_mm_NoGIA",            # HDR 6
    "STD_NoGIA",                # HDR 7
    "Smoothed_NoGIA",           # HDR 8
    "GMSL_mm_GIA",              # HDR 9
    "STD_GIA",                  # HDR 10
    "Smoothed_GIA",             # HDR 11
    "Smoothed_GIA_SeasonRemoved",  # HDR 12
    "Smoothed_NoGIA_SeasonRemoved" # HDR 13
]

# Open input file and read lines
with open(input_file, "r") as f_in:
    lines = f_in.readlines()

# Open output CSV file
with open(output_file, "w", newline='') as f_out:
    writer = csv.writer(f_out)
    
    # Write header
    writer.writerow(columns)
    
    # Process each line
    for line in lines:
        # Skip empty lines
        if not line.strip():
            continue
        # Split by whitespace and write to CSV
        row = line.split()
        writer.writerow(row)

print(f"CSV file saved as {output_file}")
