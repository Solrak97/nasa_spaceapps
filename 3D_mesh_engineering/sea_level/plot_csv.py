import csv
import matplotlib.pyplot as plt
import numpy as np

# Input CSV file
input_file = "sea_level_filtered.csv"

years = []
gmsl_gia = []

# Read CSV
with open(input_file, "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            # Convert values to float
            year = float(row["Year_Fraction"])
            gmsl = float(row["Smoothed_GIA"])
            
            # Skip missing/bad values
            if gmsl == 99900.0:
                continue
            
            years.append(year)
            gmsl_gia.append(gmsl)
        except ValueError:
            continue

# Convert to numpy arrays for trend line calculation
years_np = np.array(years)
gmsl_np = np.array(gmsl_gia)

# Fit a linear trend line
coeffs = np.polyfit(years_np, gmsl_np, 1)  # degree 1 = linear fit
trend_line = np.poly1d(coeffs)             # create a polynomial function from the coefficients

# Create x-values for extrapolation to 2100
trend_years = np.linspace(min(years_np), 2050, 500)
trend_values = trend_line(trend_years)      # evaluate the trend at each x-value

# Plot
plt.figure(figsize=(12,6))
plt.plot(years_np, gmsl_np, label="GMSL (GIA applied)", color="blue")
plt.plot(trend_years, trend_values, label="Trend line (extrapolated to 2100)", color="red", linestyle="--")
plt.xlim(left=1993)
plt.xlabel("Year")
plt.ylabel("GMSL (mm)")
plt.title("Global Mean Sea Level (GMSL) Variation with Extrapolated Trend")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()