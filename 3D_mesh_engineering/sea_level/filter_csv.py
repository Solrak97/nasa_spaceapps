import csv

# Input and output files
input_file = "sea_level.csv"
output_file = "sea_level_filtered.csv"

# Columns you want to keep (use header names from your CSV)
columns_to_keep = ["Year_Fraction", "Smoothed_GIA"]

# Condition function: returns True if row should be kept
# Example: keep rows where GMSL_mm_GIA > 0
def condition(row_dict):
    try:
        return float(row_dict["GMSL_mm_GIA"]) != 99900.000
    except ValueError:
        return False  # Skip invalid/missing values

# Read CSV and filter
with open(input_file, "r") as f_in, open(output_file, "w", newline="") as f_out:
    reader = csv.DictReader(f_in)
    writer = csv.DictWriter(f_out, fieldnames=columns_to_keep)
    
    # Write header
    writer.writeheader()
    
    for row in reader:
        if condition(row):
            # Keep only desired columns
            filtered_row = {col: row[col] for col in columns_to_keep}
            writer.writerow(filtered_row)

print(f"Filtered CSV saved as {output_file}")
