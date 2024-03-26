import os
import pandas as pd

# xlsx unprocessed file path
xlsx_file_path = 'UnprocessedData/NBA_Data_2023.xlsx'
xlsx = pd.ExcelFile(xlsx_file_path)

# Create 2023Data/Teams and 2023Data/Players directories
root = '2023Data'
teams_dir = os.path.join(root, 'Teams') 
players_dir = os.path.join(root, 'Players') 
os.makedirs(teams_dir, exist_ok=True)
os.makedirs(players_dir, exist_ok=True)

# Process and save the "Teams" sheet in the xlsx file
teams_df = pd.read_excel(xlsx, sheet_name='Teams')
teams_df.to_csv(os.path.join(teams_dir, 'Teams.csv'), index=False)

# Process and save each "Players" sheet
for sheet_name in xlsx.sheet_names:
    # Every Player sheet is in the format "Team{id}Players{year}"
    if sheet_name.startswith('Team') and sheet_name.endswith('Players2023'): 
        df = pd.read_excel(xlsx, sheet_name=sheet_name)
        df.to_csv(os.path.join(players_dir,
                  f"{sheet_name}.csv"), index=False)

print("Processing Done")
