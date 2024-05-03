import requests
import json

class Game:
    def __init__(self, game_id, date, arena_name, city, state, country, home_team, visitor_team, home_score, visitor_score, team_id):
        self.game_id = game_id
        self.date = date
        self.arena_name = arena_name
        self.city = city
        self.state = state
        self.country = country
        self.home_team = home_team
        self.visitor_team = visitor_team
        self.home_score = home_score
        self.visitor_score = visitor_score
        self.team_id = team_id

def get_games_by_team(team_id, season):
    """
    Retrieves all games for a specific team during input season.
    Args:
        team_id (int): The ID of the NBA team.
        season (str): The desired season (e.g., "2023").
    Returns:
        list: A list of Game objects containing game statistics.
    """
    url = "https://api-nba-v1.p.rapidapi.com/games"
    querystring = {"team": str(team_id), "season": str(season)}
    headers = {
        "X-RapidAPI-Key": "XXXXXX",
        "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring)
        games_data = response.json()["response"]
        games_list = []

        for game in games_data:
            game_obj = Game(
                game_id=game["id"],
                date=game["date"]["start"],
                arena_name=game["arena"]["name"],
                city=game["arena"]["city"],
                state=game["arena"]["state"],
                country=game["arena"]["country"],
                home_team=game["teams"]["home"]["name"],
                visitor_team=game["teams"]["visitors"]["id"],
                home_score=game["scores"]["home"]["points"],
                visitor_score=game["scores"]["visitors"]["points"],
                team_id=game["teams"]["home"]["id"]
            )
            games_list.append(game_obj)
        return games_list
    except requests.RequestException as e:
        print(f"Error fetching data: {e}")
        return []

# Example usage:
team_id = 1  # Replace with the actual team ID
season = "2023"  # Replace with the desired season
games_list = get_games_by_team(team_id, season)

if games_list:
    print(f"Number of games: {len(games_list)}")
    for game in games_list:
        print(f"TeamID:{game.team_id}, VisitorID:{game.visitor_team}")
else:
    print("Failed to retrieve game stats.")
