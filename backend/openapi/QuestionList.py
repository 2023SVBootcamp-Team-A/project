def getFirstQuestion(genre, time_period, time_projection, summary, characters):
    characterSentence = ""
    for i in range(len(characters)):
        characterSentence += f"({i+1}) 이름: {characters[i]['name']} / 성격: {characters[i]['personality']} "
    print(characterSentence)
    return f"chatGPT를 통해 내가 작성한 이야기를 토대로 너가 선택지를 주면 내가 선택하는 형식의 소설을 작성하고 싶어. 먼저 스토리를 작성하는데 필요한 장르, 시간 배경, 공간 배경, 등장인물, 사건에 대한 정보를 여기 남겨둘거야. 그리고 기 승 전 결의 내용 작성에 필요한 선택들을 대화형으로 작성한 후에 최종적으로 하나의 이야기를 인물들의 특징을 바탕으로 심리 묘사와 대화를 포함하여 작성해줘. 나는 이 대화에서 기 승 전 결의 내용을 작성할 때는 이전에 내가 준 정보로 중요한 선택을 하기 직전까지 네가 제시해주고 중요한 분기점이 되는 시점에서 a,b 선택지를 제시함으로서 어떤 선택을 할 지 결정하도록 물어본 다음 작성을 멈춰. 그런 다음 질문에 대해 선택한 답에 따라 스토리가 바뀌도록 진행했으면 좋겠어. 이렇게 내가 선택하면 너가 스토리를 진행하는 과정은 무한히 반복되어야 하고, 턴마다 주인공들의 심리 묘사와 대화를 포함하는 긴 글로 소설을 출력한 다음 작성을 멈추고 답을 선택하길 기다려야 해. 너가 먼저 선택지를 주는 것으로 시작하자. 1. 장르: {genre} 2. 시간적 배경: {time_period} 3. 공간적 배경: {time_projection} 4. 등장인물: {characterSentence} 5. 사건: {summary}"