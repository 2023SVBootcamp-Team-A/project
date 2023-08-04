def getFirstQuestion(genre, time_period, time_projection, summary, characters):
    characterSentence = ""
    for i in range(len(characters)):
        characterSentence += f"({i+1}) 이름: {characters[i]['name']} / 성격: {characters[i]['personality']} "
    return f"1. 장르: {genre} 2. 시간적 배경: {time_period} 3. 공간적 배경: {time_projection} 4. 등장인물: {characterSentence} 5. 사건: {summary}"