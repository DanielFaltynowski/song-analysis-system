bash songs_recommendation/database/create-neo4j-db.sh song-analysis-system;
cp ./songs_recommendation/database/data.csv ./neo4j/import;

echo "Wait 30 seconds to run database! . . .";
sleep 30;
python songs_recommendation/database/creator.py;

echo "Wait 10 seconds to run server! . . ."
sleep 10;
flask --app songs_recommendation/server/app.py run;